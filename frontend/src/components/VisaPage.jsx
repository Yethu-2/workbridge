
import React, { useState } from 'react';


const VisaPage = ({ direction, onApply, t, visaType, onVisaTypeChange }) => {
 const [diagnosisScore, setDiagnosisScore] = useState(null);
 const [isDiagnosing, setIsDiagnosing] = useState(false);

 const runDiagnosis = () => {
 setIsDiagnosing(true);
 setTimeout(() => {
 setDiagnosisScore(85);
 setIsDiagnosing(false);
 }, 2000);
 };

 const getTabClass = (tabName) => {
 return `px-6 py-4 text-xs font-black uppercase tracking-widest transition-all ${
 visaType === tabName
 ? 'bg-slate-900 text-white rounded-xl'
 : 'text-slate-400 hover:text-slate-900'
 }`;
 };

 return (
 <div className="animate-fade-in max-w-5xl mx-auto space-y-20 pb-32">
 <div className="text-center space-y-6 pt-12">
 <span className="bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Legal Immigration Support</span>
 <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">{t('diagnosis_title')}</h1>
 <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">AI-powered E-7 / Working Holiday point calculation based on South Korean MOJ guidelines.</p>
 </div>

 <div className="flex justify-center flex-wrap gap-2">
 <button className={getTabClass('working-holiday')} onClick={() => onVisaTypeChange('working-holiday')}>Working Holiday</button>
 <button className={getTabClass('e7')} onClick={() => onVisaTypeChange('e7')}>E-7 Expert</button>
 <button className={getTabClass('student')} onClick={() => onVisaTypeChange('student')}>Student D-2</button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 {/* Diagnostic Form */}
 <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl space-y-8">
 <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-8">Diagnosis Form</h3>
 <div className="space-y-6">
 <div>
 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Academic Level</label>
 <select className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-slate-900">
 <option>Bachelor's Degree (RMIT)</option>
 <option>Master's Degree</option>
 <option>Ph.D.</option>
 </select>
 </div>
 <div>
 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">TOPIK Proficiency</label>
 <select className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-slate-900">
 <option>No Level / Below 3</option>
 <option>Level 3</option>
 <option>Level 4 (Work Ready)</option>
 <option>Level 5-6 (Mastery)</option>
 </select>
 </div>
 <div>
 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Age (Point-based)</label>
 <input type="number" defaultValue={24} className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-slate-900" />
 </div>
 </div>
 <button 
 onClick={runDiagnosis}
 className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all uppercase text-sm tracking-tighter"
 >
 {isDiagnosing ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : "Calculate Success Rate"}
 </button>
 </div>

 {/* Results / Info Card */}
 <div className={`rounded-[40px] p-10 transition-all duration-500 ${diagnosisScore ? 'bg-emerald-500 text-white shadow-2xl' : 'bg-slate-100 text-slate-400'}`}>
 {diagnosisScore ? (
 <div className="text-center h-full flex flex-col justify-center animate-fade-in">
 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Diagnosis Result</h4>
 <div className="text-9xl font-black tracking-tighter mb-4">{diagnosisScore}%</div>
 <p className="text-xl font-bold mb-8">Highly Eligible for E-7-1 Visa</p>
 <div className="space-y-4 text-left max-w-xs mx-auto">
 <div className="flex justify-between border-b border-white/20 pb-2">
 <span className="text-sm font-medium opacity-60">Academic Bonus</span>
 <span className="text-sm font-black">+25 pts</span>
 </div>
 <div className="flex justify-between border-b border-white/20 pb-2">
 <span className="text-sm font-medium opacity-60">Age Bonus</span>
 <span className="text-sm font-black">+15 pts</span>
 </div>
 </div>
 <button className="mt-12 bg-white text-emerald-600 font-black px-10 py-4 rounded-full text-sm">Download Detailed Report</button>
 </div>
 ) : (
 <div className="text-center h-full flex flex-col justify-center opacity-40">
 <i className="fa-solid fa-chart-line text-6xl mb-6"></i>
 <p className="font-bold text-lg">Results will appear here<br/>after AI calculation.</p>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

export default VisaPage;
