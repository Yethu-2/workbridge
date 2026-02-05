
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CodeAnalysisResult, TranslatedString } from '../types';


const CodeScanner = ({ onAnalysisComplete, t }) => {
 const [code, setCode] = useState('');
 const [isAnalyzing, setIsAnalyzing] = useState(false);

 const analyzeCode = async () => {
 if (!code.trim()) return;
 setIsAnalyzing(true);

 try {
 const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
 const response = await ai.models.generateContent({
 model: "gemini-3-pro-preview",
 contents: `Analyze this code for quality, efficiency, security, and architecture. Provide scores (0-100) and suggestions in JSON format. Code: \n\n ${code}`,
 config: {
 responseMimeType: "application/json",
 responseSchema: {
 type: Type.OBJECT,
 properties: {
 score: { type: Type.NUMBER },
 metrics: {
 type: Type.OBJECT,
 properties: {
 cleanCode: { type: Type.NUMBER },
 efficiency: { type: Type.NUMBER },
 security: { type: Type.NUMBER },
 architecture: { type: Type.NUMBER },
 },
 required: ["cleanCode", "efficiency", "security", "architecture"]
 },
 summary: {
 type: Type.OBJECT,
 properties: {
 ko: { type: Type.STRING },
 en: { type: Type.STRING },
 vi: { type: Type.STRING },
 }
 },
 suggestions: {
 type: Type.ARRAY,
 items: {
 type: Type.OBJECT,
 properties: {
 ko: { type: Type.STRING },
 en: { type: Type.STRING },
 vi: { type: Type.STRING },
 }
 }
 }
 },
 required: ["score", "metrics", "summary", "suggestions"]
 }
 }
 });

 const result = JSON.parse(response.text || '{}');
 onAnalysisComplete(result);
 } catch (error) {
 console.error("AI Analysis failed:", error);
 } finally {
 setIsAnalyzing(false);
 }
 };

 return (
 <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl overflow-hidden relative">
 <div className="flex items-center mb-6">
 <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4">
 <i className="fa-solid fa-microchip"></i>
 </div>
 <h3 className="text-2xl font-black tracking-tighter text-slate-900">AI CODE QUALITY SCANNER</h3>
 </div>
 
 <textarea
 className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all"
 placeholder="Paste your source code here (Python, JS, C++, etc.)..."
 value={code}
 onChange={(e) => setCode(e.target.value)}
 />
 
 <button
 onClick={analyzeCode}
 disabled={isAnalyzing}
 className="w-full mt-6 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 disabled:bg-slate-300 transition-all flex items-center justify-center"
 >
 {isAnalyzing ? (
 <>
 <i className="fa-solid fa-spinner fa-spin mr-2"></i>
 ANALYZING CODE QUALITY...
 </>
 ) : (
 "START AI QUALITY SCAN"
 )}
 </button>
 </div>
 );
};

export default CodeScanner;
