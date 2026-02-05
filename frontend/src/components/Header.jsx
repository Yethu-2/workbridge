
import React, { useState } from 'react';


const Header = ({ 
 onHomeClick, onFindJobsClick, onVolunteerClick, onTalentPoolClick, onMyPageClick, onCommunityClick, onCommunityTabNavigate, onVisaClick, onLogout, onLogin, isLoggedIn,
 language, onLanguageChange, t
}) => {
 const [activeDropdown, setActiveDropdown] = useState(null);

 const navItems = [
 { 
 id: 'jobs', 
 label: t('findJobs'), 
 onClick: onFindJobsClick,
 submenu: [
 { label: 'AI Verified Jobs', onClick: onFindJobsClick, icon: 'fa-shield-check' },
 { label: 'Visa Support', onClick: onVisaClick, icon: 'fa-passport' },
 { label: 'High Salary R-Elite', onClick: onFindJobsClick, icon: 'fa-coins' }
 ]
 },
 { 
 id: 'talent', 
 label: t('talentPool'), 
 onClick: onTalentPoolClick,
 submenu: [
 { label: 'Top AI Scorers', onClick: onTalentPoolClick, icon: 'fa-bolt' },
 { label: 'Language Pros', onClick: onTalentPoolClick, icon: 'fa-language' }
 ]
 },
 { 
 id: 'volunteer', 
 label: t('workingHoliday'), 
 onClick: () => onVolunteerClick(),
 submenu: [
 { label: 'Agriculture (WH)', onClick: () => onVolunteerClick({ whCategory: 'Agriculture' }), icon: 'fa-seedling' },
 { label: 'Tech WH', onClick: () => onVolunteerClick({ whCategory: 'Tech WH' }), icon: 'fa-laptop-code' },
 { label: 'Service WH', onClick: () => onVolunteerClick({ whCategory: 'Service' }), icon: 'fa-utensils' },
 { label: 'Culture WH', onClick: () => onVolunteerClick({ whCategory: 'Culture' }), icon: 'fa-masks-theater' }
 ]
 },
 { 
 id: 'community', 
 label: t('community'), 
 onClick: onCommunityClick,
 submenu: [
 { label: 'General Board', onClick: () => onCommunityTabNavigate('posts'), icon: 'fa-comments' },
 { label: 'Photo Gallery', onClick: () => onCommunityTabNavigate('photos'), icon: 'fa-camera' },
 { label: 'Marketplace', onClick: () => onCommunityTabNavigate('market'), icon: 'fa-shop' }
 ]
 }
 ];

 const langButtonClasses = (lang) => 
 `px-2 py-1 text-[10px] font-black rounded-md transition-all ${
 language === lang ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 hover:bg-slate-50'
 }`;

 return (
 <header className="bg-white/90 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100 h-20 flex items-center shadow-sm">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-12">
 <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="text-2xl font-black text-slate-900 tracking-tighter">
 KONEXA
 </a>
 
 <nav className="hidden lg:flex items-center space-x-2">
 {navItems.map((item) => (
 <div 
 key={item.id} 
 className="relative group"
 onMouseEnter={() => setActiveDropdown(item.id)}
 onMouseLeave={() => setActiveDropdown(null)}
 >
 <button onClick={item.onClick} className="text-slate-500 hover:text-slate-900 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1 group-hover:bg-slate-50">
 {item.label}
 <i className="fa-solid fa-chevron-down text-[10px] opacity-30 group-hover:rotate-180 transition-transform"></i>
 </button>
 
 <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform group-hover:translate-y-0 translate-y-2 z-50">
 <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-3 mb-2">Category</div>
 <div className="space-y-1">
 {item.submenu.map((sub, idx) => (
 <button 
 key={idx}
 onClick={(e) => { e.stopPropagation(); sub.onClick(); setActiveDropdown(null); }}
 className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-50 flex items-center gap-3 group/sub transition-all"
 >
 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/sub:bg-slate-900 group-hover/sub:text-white transition-colors">
 <i className={`fa-solid ${sub.icon} text-xs`}></i>
 </div>
 <span className="text-sm font-bold text-slate-600 group-hover/sub:text-slate-900">{sub.label}</span>
 </button>
 ))}
 </div>
 </div>
 </div>
 ))}
 </nav>
 </div>

 <div className="flex items-center space-x-6">
 <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-xl">
 <button onClick={() => onLanguageChange('ko')} className={langButtonClasses('ko')}>KR</button>
 <button onClick={() => onLanguageChange('en')} className={langButtonClasses('en')}>EN</button>
 <button onClick={() => onLanguageChange('vi')} className={langButtonClasses('vi')}>VN</button>
 </div>
 {isLoggedIn ? (
 <button onClick={onMyPageClick} className="bg-slate-900 text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-tighter">{t('myPage')}</button>
 ) : (
 <button onClick={onLogin} className="bg-slate-900 text-white text-xs font-black px-8 py-3.5 rounded-full uppercase tracking-tighter">{t('login')}</button>
 )}
 </div>
 </div>
 </div>
 </header>
 );
};

export default Header;
