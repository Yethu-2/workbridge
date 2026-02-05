
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const InterviewSystem = () => {
 const [isLive, setIsLive] = useState(false);
 const [status, setStatus] = useState('READY TO INTERVIEW');
 const videoRef = useRef(null);

 const startInterview = async () => {
 setIsLive(true);
 setStatus('AI INTERVIEWER CONNECTING...');
 
 // WebCam Access for Visual
 try {
 const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
 if (videoRef.current) videoRef.current.srcObject = stream;
 
 // Note session logic would go here using ai.live.connect
 // For this demo, we simulate the state.
 setTimeout(() => setStatus('LIVE IN PROGRESS'), 2000);
 } catch (e) {
 console.error("Media access denied", e);
 setStatus('ERROR ACCESS DENIED');
 }
 };

 return (
 <div className="bg-slate-900 text-white rounded-[40px] p-8 shadow-2xl overflow-hidden border border-white/10">
 <div className="flex justify-between items-center mb-6">
 <div className="flex items-center">
 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
 <span className="text-xs font-black tracking-widest uppercase">{status}</span>
 </div>
 <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">GEMINI 2.5 NATIVE AUDIO</div>
 </div>

 <div className="relative aspect-video bg-black rounded-3xl overflow-hidden mb-6 border border-white/5">
 <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-80" />
 {!isLive && (
 <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
 <i className="fa-solid fa-video-slash text-4xl opacity-20"></i>
 </div>
 )}
 <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
 <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
 <p className="text-[10px] font-bold text-emerald-400 mb-1">AI INTERVIEWER</p>
 <p className="text-sm font-medium leading-tight">"Hello! Could you tell me about your most challenging project at RMIT?"</p>
 </div>
 </div>
 </div>

 <div className="flex gap-4">
 {!isLive ? (
 <button onClick={startInterview} className="flex-1 bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-tighter">
 Enter Interview Room
 </button>
 ) : (
 <button onClick={() => setIsLive(false)} className="flex-1 bg-red-500 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all uppercase tracking-tighter">
 End Session
 </button>
 )}
 </div>
 </div>
 );
};

export default InterviewSystem;
