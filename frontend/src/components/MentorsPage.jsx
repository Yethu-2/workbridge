import React, { useState, useMemo } from 'react';

const FilterDropdown = ({ label, options, selectedValue, onSelect, language, getTranslated }) => {
 const [isOpen, setIsOpen] = useState(false);

 const getDisplayValue = () => {
 if (selectedValue === 'all') return `모든 ${label}`;
 const found = options.find(o => getTranslated(o, 'ko') === selectedValue);
 return found ? getTranslated(found, language) : selectedValue;
 }

 return (
 <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
 <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between w-48 text-sm">
 <span>{getDisplayValue()}</span>
 <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
 </button>
 {isOpen && (
 <div className="absolute z-10 top-full mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 p-2">
 <ul className="max-h-60 overflow-y-auto">
 <li onClick={() => onSelect('all')} className="px-3 py-2 text-sm hover:bg-slate-100 rounded-md cursor-pointer">모든 {label}</li>
 {options.map(option => (
 <li 
 key={getTranslated(option, 'ko')}
 onClick={() => onSelect(getTranslated(option, 'ko'))} 
 className="px-3 py-2 text-sm hover:bg-slate-100 rounded-md cursor-pointer"
 >
 {getTranslated(option, language)}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )
}

const MentorsPage = ({ mentors, t, language, getTranslated, uniqueLocations, allSkills }) => {
 const [locationFilter, setLocationFilter] = useState('all');
 const [skillFilter, setSkillFilter] = useState('all');

 const handleApplyForMentoring = (mentorName, type) => {
 alert(`${mentorName}님에게 ${type === 'online' ? t('apply_online') : t('apply_offline')}을(를) 신청했습니다. (시뮬레이션)`);
 };

 const filteredMentors = useMemo(() => {
 return mentors.filter(mentor => {
 const matchesLocation = locationFilter === 'all' || getTranslated(mentor.location, 'ko') === locationFilter;
 
 const mentorSkills = mentor.skills?.map(s => getTranslated(s, 'ko')) || [];
 const matchesSkill = skillFilter === 'all' || mentorSkills.includes(skillFilter);

 return matchesLocation && matchesSkill;
 });
 }, [mentors, locationFilter, skillFilter, getTranslated]);
 
 return (
 <div className="animate-fade-in max-w-5xl mx-auto">
 <div className="text-center mb-12">
 <i className="fa-solid fa-users text-5xl text-slate-400"></i>
 <h2 className="text-3xl font-bold text-slate-800 mt-4">{t('mentors_title')}</h2>
 <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">{t('mentors_subtitle')}</p>
 </div>
 
 <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center space-x-4">
 <FilterDropdown 
 label="지역"
 options={uniqueLocations}
 selectedValue={locationFilter}
 onSelect={setLocationFilter}
 language={language}
 getTranslated={getTranslated}
 />
 <FilterDropdown 
 label="기술"
 options={allSkills}
 selectedValue={skillFilter}
 onSelect={setSkillFilter}
 language={language}
 getTranslated={getTranslated}
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {filteredMentors.map(mentor => (
 <div key={mentor.id} className="bg-white rounded-xl border border-slate-200 p-6 text-center flex flex-col">
 <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto ring-4 ring-slate-100 object-cover" />
 <h3 className="text-xl font-bold text-slate-800 mt-4">{mentor.name}</h3>
 <p className="text-sm text-slate-500 font-semibold">{getTranslated(mentor.company, language)}</p>
 <p className="text-sm text-slate-500">{getTranslated(mentor.location, language)}</p>
 <div className="my-3">
 <div className="flex flex-wrap gap-1.5 justify-center">
 {mentor.skills?.slice(0, 3).map((skill, index) => (
 <span key={index} className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
 {getTranslated(skill, language)}
 </span>
 ))}
 </div>
 </div>
 <p className="text-slate-600 mt-2 flex-grow text-sm">{getTranslated(mentor.bio, language)}</p>
 <div className="mt-6 w-full space-y-2">
 {mentor.mentoringTypes?.includes('online') && (
 <button 
 onClick={() => handleApplyForMentoring(mentor.name, 'online')}
 className="w-full bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex items-center justify-center"
 >
 <i className="fa-solid fa-desktop mr-2"></i> {t('apply_online')}
 </button>
 )}
 {mentor.mentoringTypes?.includes('offline') && (
 <button 
 onClick={() => handleApplyForMentoring(mentor.name, 'offline')}
 className="w-full bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition duration-300 border border-slate-300 flex items-center justify-center"
 >
 <i className="fa-solid fa-handshake-simple mr-2"></i> {t('apply_offline')}
 </button>
 )}
 </div>
 </div>
 ))}
 {filteredMentors.length === 0 && (
 <div className="md:col-span-2 lg:col-span-3 text-center py-16">
 <p className="text-slate-600 font-semibold">선택한 조건에 맞는 멘토가 없습니다.</p>
 </div>
 )}
 </div>
 </div>
 );
};

export default MentorsPage;