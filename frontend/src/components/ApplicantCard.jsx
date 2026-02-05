
import React from 'react';
import { UserProfile, TranslatedString } from '../types';


const ApplicantCard = ({ applicant, viewerRole, t, language, getTranslated, onSelect }) => {
 // Blind Hiring name and hide personal info if viewer is an employer
 const isEmployer = viewerRole === 'employer';
 const displayName = isEmployer ? `Candidate #${applicant.id.toString().padStart(4, '0')}` : applicant.name;

 return (
 <div 
 onClick={() => onSelect?.(applicant)}
 className="bg-white rounded-[40px] p-8 border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
 >
 <div className="flex items-center gap-6 mb-8">
 <div className="relative">
 {/* Use a generic avatar if blind hiring is active */}
 <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
 {isEmployer ? (
 <i className="fa-solid fa-user-secret text-3xl text-slate-300"></i>
 ) : (
 <img src={applicant.avatar} className="w-full h-full object-cover" alt="" />
 )}
 </div>
 {applicant.aiVerification?.ocrVerified && (
 <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
 <i className="fa-solid fa-check text-[10px]"></i>
 </div>
 )}
 </div>
 <div>
 <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{displayName}</h4>
 <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
 {isEmployer ? 'Verified Global Talent' : applicant.university}
 </p>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="bg-slate-50 p-4 rounded-2xl">
 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">AI Tech Score</p>
 <p className="text-xl font-black text-slate-900">{applicant.aiVerification?.devScore}%</p>
 </div>
 <div className="bg-slate-50 p-4 rounded-2xl">
 <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Visa Prob.</p>
 <p className="text-xl font-black text-emerald-500">{applicant.visaDiagnosis?.probability}%</p>
 </div>
 </div>

 <div className="mt-8 flex gap-2">
 {applicant.skills?.slice(0, 3).map((skill, idx) => (
 <span key={idx} className="bg-white text-slate-500 text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-slate-100">
 {getTranslated(skill, language)}
 </span>
 ))}
 </div>
 
 <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
 <span className="text-[10px] font-black uppercase text-slate-900 flex items-center gap-2">
 View Expertise <i className="fa-solid fa-arrow-right-long"></i>
 </span>
 </div>
 </div>
 );
};

export default ApplicantCard;
