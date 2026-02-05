
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";



const Chatbot = ({ t }) => {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState([
 { text: '안녕하세요! Workbridge AI 챗봇입니다. 무엇을 도와드릴까요?', sender: 'bot' }
 ]);
 const [inputValue, setInputValue] = useState('');
 const [chatSession, setChatSession] = useState(null);
 const [isBotTyping, setIsBotTyping] = useState(false);
 const messagesEndRef = useRef(null);

 useEffect(() => {
 const initChat = async () => {
 try {
 // Initialize GoogleGenAI with API key from environment variables.
 const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
 const chat = ai.chats.create({
 // Correcting model to gemini-3-flash-preview as per guidelines.
 model: 'gemini-3-flash-preview',
 config: {
 systemInstruction: `당신은 Workbridge 플랫폼의 AI 어시스턴트입니다. Workbridge는 대한민국과 베트남 간의 인재를 연결하는 글로벌 워킹홀리데이 매칭 플랫폼입니다. 베트남 구직자들이 한국에서 일자리를 찾거나(VN->KR), 한국 구직자들이 베트남에서 일자리를 찾는(KR->VN) 것을 돕습니다. 주요 기능으로는 '일자리 찾기', '비자 신청 안내', '멘토링', '커뮤니티'가 있습니다. 사용자의 질문에 친절하고 간결하게 답변해주세요. 플랫폼 사용법에 대한 질문에 답하고, 만약 모르는 내용이 있다면 AI 챗봇이므로 고객센터에 문의하라고 안내해주세요. 한국어, 영어, 베트남어로 대화할 수 있습니다.`,
 },
 });
 setChatSession(chat);
 } catch (error) {
 console.error("Failed to initialize chatbot:", error);
 setMessages(prev => [...prev, { text: '챗봇 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.', sender: 'bot' }]);
 }
 };
 initChat();
 }, []);


 const scrollToBottom = () => {
 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 };

 useEffect(scrollToBottom, [messages, isBotTyping]);

 const toggleChat = () => {
 setIsOpen(!isOpen);
 };

 const handleSendMessage = async (e) => {
 e.preventDefault();
 if (inputValue.trim() === '' || !chatSession || isBotTyping) return;

 const userMessage = { text: inputValue, sender: 'user' };
 setMessages(prev => [...prev, userMessage]);
 const currentInput = inputValue;
 setInputValue('');
 setIsBotTyping(true);

 try {
 // Using sendMessageStream for streaming responses.
 const response = await chatSession.sendMessageStream({ message: currentInput });
 
 setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
 
 for await (const chunk of response) {
 // Accessing .text property directly as per guidelines.
 const chunkText = chunk.text;
 if (chunkText) {
 setMessages(prev => {
 const newMessages = [...prev];
 const lastMessage = newMessages[newMessages.length - 1];
 if (lastMessage.sender === 'bot') {
 lastMessage.text += chunkText;
 }
 return newMessages;
 });
 }
 }
 } catch (error) {
 console.error("Chatbot API error:", error);
 const errorMessage = { text: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', sender: 'bot' };
 setMessages(prev => [...prev, errorMessage]);
 } finally {
 setIsBotTyping(false);
 }
 };

 return (
 <>
 <button
 onClick={toggleChat}
 className={`fixed bottom-6 right-6 bg-slate-800 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
 aria-label="Open chatbot"
 >
 <i className="fa-solid fa-robot text-2xl"></i>
 </button>

 <div className={`fixed bottom-6 right-6 w-full max-w-sm h-[70vh] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
 {/* Header */}
 <div className="flex justify-between items-center p-4 bg-slate-800 text-white rounded-t-xl">
 <h3 className="font-bold">Workbridge AI 챗봇</h3>
 <button onClick={toggleChat} className="hover:opacity-75" aria-label="Close chatbot">
 <i className="fa-solid fa-times text-xl"></i>
 </button>
 </div>

 {/* Messages */}
 <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
 <div className="space-y-4">
 {messages.map((msg, index) => (
 <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
 <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-800'}`}>
 {msg.text}
 </div>
 </div>
 ))}
 {isBotTyping && (
 <div className="flex justify-start">
 <div className="max-w-xs px-4 py-2 rounded-2xl bg-slate-200 text-slate-800">
 <div className="flex items-center space-x-1">
 <span className="dot animate-bounce">.</span>
 <span className="dot animate-bounce animation-delay-200">.</span>
 <span className="dot animate-bounce animation-delay-400">.</span>
 </div>
 </div>
 </div>
 )}
 </div>
 <div ref={messagesEndRef} />
 </div>

 {/* Input */}
 <div className="p-4 border-t border-slate-200">
 <form onSubmit={handleSendMessage} className="flex space-x-2">
 <input
 type="text"
 value={inputValue}
 onChange={(e) => setInputValue(e.target.value)}
 placeholder={!chatSession ? "AI 챗봇을 초기화하는 중..." : "메시지를 입력하세요..."}
 className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:bg-slate-100"
 disabled={isBotTyping || !chatSession}
 />
 <button 
 type="submit" 
 className="bg-slate-800 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-slate-700 transition-colors disabled:bg-slate-400"
 disabled={isBotTyping || !chatSession}
 >
 <i className="fa-solid fa-paper-plane"></i>
 </button>
 </form>
 </div>
 </div>
 <style>{`
 .dot { font-size: 1.5rem; }
 .animation-delay-200 { animation-delay: 0.2s; }
 .animation-delay-400 { animation-delay: 0.4s; }
 `}</style>
 </>
 );
};

export default Chatbot;
