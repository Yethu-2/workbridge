
import React, { useState } from 'react';
import { UserProfile, TranslatedString } from '../types';
import ApplicantCard from './ApplicantCard';


const TalentPoolPage = ({ applicants, skills: allSkills, t, language, getTranslated, viewerRole, onSelectApplicant }) => {
 return (
 <div className="animate-fade-in max-w-7xl mx-auto py-12 px-4">
 <div className="mb-20 text-center lg:text-left">
 <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-6 inline-block tracking-widest">Global Elite Access</span>
 <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">{t('talentPool_title')}</h1>
 <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">{t('talentPool_subtitle')}</p>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {applicants.map(applicant => (
 <ApplicantCard 
 key={applicant.id}
 applicant={applicant}
 viewerRole={viewerRole}
 t={t}
 language={language}
 getTranslated={getTranslated}
 onSelect={onSelectApplicant}
 />
 ))}
 </div>
 </div>
 );
};

export default TalentPoolPage;
