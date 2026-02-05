
import React from 'react';
import { Job, TranslatedString } from '../types';
import JobCard from './JobCard';


const HomePage = ({ 
 onFindJobsClick, onVisaDiagnosisClick, featuredJobs, t, language, getTranslated, onSelectJob, onToggleBookmark 
}) => {
 return (
 <div className="animate-fade-in space-y-32 pb-32">
 {/* Hero Section, Image-Focused */}
 <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
 <div className="absolute inset-0 z-0">
 <img 
 src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
 className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom" 
 alt="Global Success"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900"></div>
 </div>
 
 <div className="container mx-auto px-4 relative z-10 text-center">
 <div className="space-y-6 max-w-4xl mx-auto">
 <span className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black tracking-[0.4em] uppercase px-6 py-2 rounded-full mb-4">
 Premium Global Career Bridge
 </span>
 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.15]">
 {t('home_heroTitle')}
 </h1>
 <p className="text-lg md:text-xl text-slate-300 font-medium max-w-xl mx-auto leading-relaxed opacity-90">
 {t('home_heroSubtitle')}
 </p>
 <div className="flex flex-col sm:flex-row gap-5 justify-center pt-10">
 <button onClick={onFindJobsClick} className="bg-white text-slate-900 font-black text-xs px-12 py-5 rounded-full hover:bg-slate-100 transition-all shadow-2xl hover:scale-105">
 {t('home_cta_explore')}
 </button>
 <button onClick={onVisaDiagnosisClick} className="bg-transparent text-white border border-white/30 font-black text-xs px-12 py-5 rounded-full hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105">
 {t('diagnosis_title')}
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Featured Jobs Section */}
 <section className="container mx-auto px-4">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
 <div className="max-w-xl">
 <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight uppercase">Featured Elite Jobs</h2>
 <p className="text-lg text-slate-400 font-medium">Curated and verified for your success.</p>
 </div>
 <button onClick={onFindJobsClick} className="text-slate-900 font-black text-[10px] border-b-2 border-slate-900 pb-1 tracking-widest uppercase">
 View All Opportunities
 </button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {featuredJobs.map(job => (
 <JobCard key={job.id} job={job} onSelect={onSelectJob} onToggleBookmark={onToggleBookmark} t={t} language={language} getTranslated={getTranslated} />
 ))}
 </div>
 </section>

 {/* Visual Call to Action */}
 <section className="container mx-auto px-4">
 <div className="bg-slate-900 rounded-[40px] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[400px]">
 <div className="lg:w-1/2 p-12 flex flex-col justify-center space-y-6">
 <h3 className="text-white text-4xl font-black tracking-tighter">Your Future Starts with KONEXA.</h3>
 <p className="text-slate-400 font-medium">Expert visa consulting, AI talent matching, and cultural immersion programs all in one platform.</p>
 <button onClick={onVisaDiagnosisClick} className="bg-white text-slate-900 font-black text-[10px] px-8 py-4 rounded-full w-fit uppercase tracking-widest">Start Diagnosis</button>
 </div>
 <div className="lg:w-1/2 h-64 lg:h-full">
 <img src="https://images.unsplash.com/photo-1557426282-048c7bb85eb5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Success" />
 </div>
 </div>
 </section>
 </div>
 );
};

export default HomePage;
