
import React, { useState } from 'react';
import StarRating from './StarRating';


const JobDetails = ({ job, onBack, onApply, t, language, getTranslated }) => {
 const [selectedCurrency, setSelectedCurrency] = useState('KRW');
 const rates = { VND: 18.5, USD: 0.00075 };

 const getConvertedSalary = () => {
 const base = job.salary.amount;
 if (selectedCurrency === 'VND') return (base * rates.VND).toLocaleString() + ' ₫';
 if (selectedCurrency === 'USD') return (base * rates.USD).toLocaleString() + ' $';
 return base.toLocaleString() + ' ₩';
 };

 return (
 <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
 <button onClick={onBack} className="mb-10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 flex items-center gap-2 transition-all">
 <i className="fa-solid fa-arrow-left"></i> Back to Exploration
 </button>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
 <div className="lg:col-span-2 space-y-12">
 <header>
 <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest mb-6 inline-block">Verified Opening</span>
 <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">{getTranslated(job.title, language)}</h1>
 <div className="flex items-center gap-4">
 <img src={job.employer.logo} className="w-12 h-12 rounded-xl object-cover" alt="" />
 <div>
 <p className="text-xl font-bold text-slate-800">{getTranslated(job.employer.name, language)}</p>
 <p className="text-sm text-slate-400 font-medium">{getTranslated(job.employer.location, language)}</p>
 </div>
 </div>
 </header>

 <div className="bg-slate-50 rounded-[40px] p-10 space-y-8">
 <h3 className="text-2xl font-black tracking-tighter uppercase">Job Description</h3>
 <p className="text-lg text-slate-600 font-medium leading-relaxed">{getTranslated(job.description, language)}</p>
 </div>
 </div>

 <aside className="space-y-8">
 {/* Premium Salary Card with Converter */}
 <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-2xl space-y-8">
 <div className="flex justify-between items-center">
 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Wage</h4>
 <div className="flex bg-slate-100 p-1 rounded-xl">
 {['KRW', 'VND', 'USD'].map(cur => (
 <button 
 key={cur}
 onClick={() => setSelectedCurrency(cur)}
 className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${selectedCurrency === cur ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
 >{cur}</button>
 ))}
 </div>
 </div>
 <div className="text-4xl font-black text-slate-900 tracking-tighter">
 {getConvertedSalary()}
 </div>
 <div className="pt-6 border-t border-slate-100 space-y-4">
 <div className="flex justify-between text-sm">
 <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Industry</span>
 <span className="text-slate-900 font-black">{getTranslated(job.industry, language)}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Visa Support</span>
 <span className="text-emerald-500 font-black">E-7-1 / H-1</span>
 </div>
 </div>
 <button onClick={() => onApply(job)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-tighter hover:bg-slate-800 transition-all">Apply to Candidate ID</button>
 </div>

 <div className="bg-slate-900 text-white rounded-[40px] p-10 shadow-xl overflow-hidden relative">
 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-10 -mt-10"></div>
 <h4 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Employer Insight</h4>
 <div className="flex items-center gap-4 mb-6">
 <StarRating rating={job.employer.averageRating} />
 <span className="text-xl font-black">{job.employer.averageRating.toFixed(1)}</span>
 </div>
 <p className="text-sm text-white/60 font-medium">95% of previous international employees recommend this workplace for its transparent wage policy.</p>
 </div>
 </aside>
 </div>
 </div>
 );
};

export default JobDetails;
