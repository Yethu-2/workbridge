
import React from 'react';
import { Job, TranslatedString } from '../types';


const JobCard = ({ job, onSelect, onToggleBookmark, t, language, getTranslated }) => {
 return (
 <div
 onClick={() => onSelect(job)}
 className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col h-full"
 >
 <div className="flex items-center gap-4 mb-8">
 <img src={job.employer.logo} className="w-12 h-12 rounded-xl object-cover ring-4 ring-slate-50" alt="" />
 <div className="flex-1">
 <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest block mb-1">{getTranslated(job.type, language)}</span>
 <h4 className="text-slate-900 font-black text-base leading-tight group-hover:text-emerald-600 transition-colors">{getTranslated(job.title, language)}</h4>
 </div>
 </div>
 
 <p className="text-slate-400 font-medium text-xs line-clamp-2 mb-8 leading-relaxed">
 {getTranslated(job.description, language)}
 </p>

 <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
 <div>
 <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block mb-1">Monthly Reward</span>
 <div className="text-lg font-black text-slate-900 tracking-tighter">
 {/* Fix: salary is an object containing text */}
 {getTranslated(job.salary.text, language)}
 </div>
 </div>
 <div className="w-8 h-8 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
 <i className="fa-solid fa-arrow-right text-[10px]"></i>
 </div>
 </div>
 </div>
 );
};

export default JobCard;
