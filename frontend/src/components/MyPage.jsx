
import React, { useState } from 'react';


const ScoreCard = ({ label, score, icon, color }) => (
 <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="flex items-center gap-4 mb-4">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
 <i className={`fa-solid ${icon} text-white`}></i>
 </div>
 <span className="text-xs font-black uppercase text-slate-400 tracking-widest">{label}</span>
 </div>
 <div className="flex items-end gap-2">
 <span className="text-4xl font-black text-slate-900 tracking-tighter">{score}</span>
 <span className="text-xs font-bold text-slate-300 mb-1.5 uppercase">pts</span>
 </div>
 <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
 <div className={`h-full rounded-full transition-all duration-1000`} style={{ width: `${score}%`, backgroundColor: color.split(' ')[0].replace('bg-', '#').replace('-500', '') }}></div>
 </div>
 </div>
);

const MyPage = ({ user, onUpdateUser, t, language, getTranslated }) => {
 const [activeSubTab, setActiveSubTab] = useState('profile');
 const [intro, setIntro] = useState(user.selfIntroduction || '');
 
 const saveProfile = () => {
 onUpdateUser({ ...user, selfIntroduction: intro });
 alert("Profile saved successfully.");
 };

 return (
 <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-fade-in px-4 pt-12">
 {/* Header */}
 <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-10">
 <div className="relative">
 <img src={user.avatar} className="w-40 h-40 rounded-full object-cover ring-8 ring-slate-50" alt="" />
 <button className="absolute bottom-0 right-0 bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white">
 <i className="fa-solid fa-camera text-xs"></i>
 </button>
 </div>
 <div className="flex-1 text-center md:text-left">
 <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{user.name}</h2>
 <p className="text-slate-400 font-bold text-lg mb-6">{getTranslated(user.nationality, language)} &middot; {user.university}</p>
 <div className="flex flex-wrap gap-2 justify-center md:justify-start">
 <button 
 onClick={() => setActiveSubTab('profile')}
 className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'profile' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
 >Profile</button>
 <button 
 onClick={() => setActiveSubTab('ai-report')}
 className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'ai-report' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
 >AI Report</button>
 <button 
 onClick={() => setActiveSubTab('preferences')}
 className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'preferences' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
 >Settings</button>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 <div className="lg:col-span-2 space-y-8">
 {activeSubTab === 'profile' && (
 <div className="space-y-8">
 {/* Video Introduction Section */}
 <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
 <div className="flex justify-between items-center">
 <h3 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
 <i className="fa-solid fa-play-circle text-indigo-500"></i> Video Introduction
 </h3>
 <button className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-[10px] font-black uppercase">Replace Video</button>
 </div>
 {user.videoUrl ? (
 <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 relative group">
 <video className="w-full h-full object-cover" controls>
 <source src={user.videoUrl} type="video/mp4" />
 Your browser does not support the video tag.
 </video>
 </div>
 ) : (
 <div className="aspect-video rounded-3xl border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300">
 <i className="fa-solid fa-clapperboard text-5xl mb-4"></i>
 <p className="font-bold">Record your 1-min introduction</p>
 <button className="mt-4 bg-indigo-600 text-white px-8 py-3 rounded-full text-xs font-black uppercase">Start Recording</button>
 </div>
 )}
 </div>

 {/* Text Introduction */}
 <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
 <div className="flex justify-between items-center">
 <h3 className="text-2xl font-black tracking-tighter uppercase">Professional Summary</h3>
 <button onClick={saveProfile} className="bg-emerald-500 text-white px-8 py-3 rounded-full text-xs font-black uppercase">Save</button>
 </div>
 <textarea 
 value={intro}
 onChange={(e) => setIntro(e.target.value)}
 placeholder="Tell your story to recruiters..."
 className="w-full h-[300px] bg-slate-50 border-none rounded-3xl p-8 text-lg font-medium text-slate-700 focus:ring-2 focus:ring-slate-900 outline-none resize-none"
 />
 </div>
 </div>
 )}

 {activeSubTab === 'ai-report' && (
 <div className="space-y-8 animate-fade-in">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <ScoreCard label="Technical Proficiency" score={user.aiVerification?.devScore || 0} icon="fa-code" color="bg-blue-500" />
 <ScoreCard label="English (IELTS Eq.)" score={user.aiVerification?.englishFluency || 0} icon="fa-language" color="bg-emerald-500" />
 <ScoreCard label="Korean (TOPIK Eq.)" score={user.aiVerification?.koreanFluency || 0} icon="fa-comment-dots" color="bg-amber-500" />
 <ScoreCard label="Visa Success Rate" score={user.visaDiagnosis?.probability || 0} icon="fa-passport" color="bg-rose-500" />
 </div>
 
 <div className="bg-indigo-900 text-white rounded-[40px] p-10 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl -mr-20 -mt-20"></div>
 <h3 className="text-2xl font-black tracking-tighter uppercase mb-6">AI Behavioral Analysis</h3>
 <div className="grid grid-cols-3 gap-6">
 <div className="text-center">
 <p className="text-[10px] font-black uppercase text-indigo-300 mb-2">Consistency</p>
 <p className="text-3xl font-black">{user.wpReady?.behavioralScore || 0}%</p>
 </div>
 <div className="text-center">
 <p className="text-[10px] font-black uppercase text-indigo-300 mb-2">Culture Fit</p>
 <p className="text-3xl font-black">{user.aiVerification?.culturalAdaptability || 0}%</p>
 </div>
 <div className="text-center">
 <p className="text-[10px] font-black uppercase text-indigo-300 mb-2">Verified</p>
 <p className="text-3xl font-black"><i className="fa-solid fa-shield-check text-emerald-400"></i></p>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>

 <aside className="space-y-8">
 <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
 <h3 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-2">
 <i className="fa-solid fa-award text-amber-400"></i> WP-Ready Status
 </h3>
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <span className="text-xs font-bold text-slate-400 uppercase">Training</span>
 <span className="text-emerald-400 font-black">COMPLETED</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-xs font-bold text-slate-400 uppercase">Verified GPA</span>
 <span className="text-white font-black">3.8 / 4.5</span>
 </div>
 </div>
 </div>
 </aside>
 </div>
 </div>
 );
};

export default MyPage;
