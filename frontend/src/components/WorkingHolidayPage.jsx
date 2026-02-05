
import React from 'react';
import { Job, TranslatedString } from '../types';
import JobCard from './JobCard';


const WorkingHolidayPage = ({ t, jobs, selectedCategory, onCategorySelect, onSelectJob, language, getTranslated }) => {
 const categories = [
 { title: 'Agriculture', icon: 'fa-seedling', desc: 'Work at farms in Jeju or rural areas.', count: 12, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop' },
 { title: 'Tech WH', icon: 'fa-code', desc: 'Developer internships with H-1 support.', count: 5, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
 { title: 'Service', icon: 'fa-utensils', desc: 'Premium hotels and restaurants.', count: 28, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop' },
 { title: 'Culture', icon: 'fa-masks-theater', desc: 'K-Culture event support.', count: 8, image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=2070&auto=format&fit=crop' },
 ];

 const currentCatData = categories.find(c => c.title === selectedCategory);

 const filteredJobs = selectedCategory 
 ? jobs.filter(j => 
 j.type.ko.includes("워킹홀리데이") && 
 (selectedCategory === 'Agriculture' ? j.employer.industry.ko === 'Agriculture' : 
 selectedCategory === 'Service' ? j.employer.industry.ko === 'Service' : 
 selectedCategory === 'Culture' ? j.employer.industry.ko === 'Culture' : 
 selectedCategory === 'Tech WH' ? j.employer.industry.ko === 'Tech' : true)
 )
 : jobs.filter(j => j.type.ko.includes("워킹홀리데이"));

 return (
 <div className="animate-fade-in pb-32">
 {/* Dynamic Header */}
 <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
 <div className="absolute inset-0 z-0">
 <img 
 src={currentCatData?.image || 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2070&auto=format&fit=crop'} 
 className="w-full h-full object-cover opacity-60 animate-slow-zoom" 
 alt="Theme"
 />
 <div className="absolute inset-0 bg-slate-900/40"></div>
 </div>
 <div className="container mx-auto px-4 text-center relative z-10">
 <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/60 mb-4 block">KONEXA H-1 SPECIALS</span>
 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
 {selectedCategory ? selectedCategory : "Experience Korea."}
 </h1>
 <p className="text-lg text-white/80 max-w-xl mx-auto font-medium opacity-90">
 {selectedCategory ? currentCatData?.desc : "Hand-picked premium Working Holiday opportunities for you."}
 </p>
 </div>
 </section>

 <div className="container mx-auto px-4 mt-20">
 {/* Sub-navigation Icons */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
 {categories.map((cat, idx) => (
 <div 
 key={idx} 
 onClick={() => onCategorySelect(cat.title)}
 className={`p-8 rounded-[32px] border transition-all cursor-pointer group flex flex-col items-center text-center ${
 selectedCategory === cat.title 
 ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105' 
 : 'bg-white border-slate-100 hover:border-slate-300'
 }`}
 >
 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
 selectedCategory === cat.title ? 'bg-white/10' : 'bg-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white'
 }`}>
 <i className={`fa-solid ${cat.icon} text-lg`}></i>
 </div>
 <h3 className="text-xl font-black mb-2">{cat.title}</h3>
 <p className={`text-[10px] font-black uppercase tracking-widest ${selectedCategory === cat.title ? 'text-white/50' : 'text-slate-400'}`}>
 {cat.count} Opportunities
 </p>
 </div>
 ))}
 </div>

 {/* Content Section */}
 <div className="animate-fade-in">
 <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
 <div>
 <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
 {selectedCategory ? `${selectedCategory} Results` : "All Working Holiday Openings"}
 </h2>
 <p className="text-slate-400 font-medium mt-2">Verified by KONEXA Legal & Tech Team.</p>
 </div>
 {selectedCategory && (
 <button 
 onClick={() => onCategorySelect(null)}
 className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 flex items-center gap-2 border-b-2 border-transparent hover:border-slate-900 pb-1"
 >
 <i className="fa-solid fa-arrow-left"></i> All Categories
 </button>
 )}
 </div>

 {filteredJobs.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {filteredJobs.map(job => (
 <JobCard key={job.id} job={job} onSelect={onSelectJob} onToggleBookmark={()=>{}} t={t} language={language} getTranslated={getTranslated} />
 ))}
 {/* Filling the space for rich look */}
 <div className="bg-white rounded-[32px] border border-slate-100 border-dashed flex flex-col items-center justify-center p-12 text-center">
 <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
 <i className="fa-solid fa-plus text-slate-300"></i>
 </div>
 <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">New listings added daily</p>
 </div>
 </div>
 ) : (
 <div className="py-24 text-center bg-slate-50 rounded-[40px] border border-slate-100">
 <i className="fa-solid fa-folder-open text-4xl text-slate-200 mb-4"></i>
 <p className="text-slate-400 font-bold">No active jobs found in this category.</p>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

export default WorkingHolidayPage;
