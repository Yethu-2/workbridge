import React, { useState } from 'react';

const SearchBar = ({ t, onSearch, locations, industries, jobTypes, skills: allSkills, language, getTranslated }) => {
 const [keyword, setKeyword] = useState('');
 const [location, setLocation] = useState('all');
 const [industry, setIndustry] = useState('all');
 const [jobType, setJobType] = useState('all');
 const [reviScore, setReviScore] = useState('all');
 const [realWageIndex, setRealWageIndex] = useState('all');
 const [selectedSkills, setSelectedSkills] = useState([]);

 const handleSkillChange = (skillName) => {
 setSelectedSkills(prev => 
 prev.includes(skillName)
 ? prev.filter(s => s !== skillName)
 : [...prev, skillName]
 );
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 onSearch({
 keyword,
 location,
 industry,
 jobType,
 reviScore,
 realWageIndex,
 skills: selectedSkills,
 });
 };

 const renderTranslatedOptions = (options) => {
 return options.map((option) => (
 <option key={getTranslated(option, 'ko')} value={getTranslated(option, 'ko')}>
 {getTranslated(option, language)}
 </option>
 ));
 };

 const selectClasses = "mt-1 block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-lg";

 return (
 <div className="bg-white p-6 rounded-xl border border-slate-200/80">
 <form onSubmit={handleSubmit}>
 <div className="space-y-6">
 <div className="sm:col-span-2 lg:col-span-4">
 <label htmlFor="keyword" className="block text-sm font-medium text-slate-700">{t('keyword')}</label>
 <div className="mt-1 relative rounded-md">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
 </div>
 <input
 type="text"
 name="keyword"
 id="keyword"
 value={keyword}
 onChange={(e) => setKeyword(e.target.value)}
 className="focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-3"
 placeholder={t('searchPlaceholder')}
 />
 </div>
 </div>
 <div>
 <label htmlFor="reviScore" className="block text-sm font-medium text-slate-700">{t('reviScore')}</label>
 <select id="reviScore" name="reviScore" className={selectClasses} value={reviScore} onChange={(e) => setReviScore(e.target.value)}>
 <option value="all">전체</option>
 <option value="4.5">4.5 이상</option>
 <option value="4.0">4.0 이상</option>
 <option value="3.0">3.0 이상</option>
 </select>
 </div>
 
 <div>
 <label htmlFor="realWageIndex" className="block text-sm font-medium text-slate-700">{t('realWageIndex')}</label>
 <select id="realWageIndex" name="realWageIndex" className={selectClasses} value={realWageIndex} onChange={(e) => setRealWageIndex(e.target.value)}>
 <option value="all">전체</option>
 <option value="높음">높음 (4-5)</option>
 <option value="보통">보통 (3)</option>
 </select>
 </div>
 <div>
 <label htmlFor="location" className="block text-sm font-medium text-slate-700">{t('location')}</label>
 <select id="location" name="location" className={selectClasses} value={location} onChange={(e) => setLocation(e.target.value)}>
 <option value="all">{t('allLocations')}</option>
 {renderTranslatedOptions(locations)}
 </select>
 </div>
 
 <div>
 <label htmlFor="industry" className="block text-sm font-medium text-slate-700">{t('industry')}</label>
 <select id="industry" name="industry" className={selectClasses} value={industry} onChange={(e) => setIndustry(e.target.value)}>
 <option value="all">{t('allIndustries')}</option>
 {renderTranslatedOptions(industries)}
 </select>
 </div>
 
 <div>
 <label htmlFor="jobType" className="block text-sm font-medium text-slate-700">{t('employmentType')}</label>
 <select id="jobType" name="jobType" className={selectClasses} value={jobType} onChange={(e) => setJobType(e.target.value)}>
 <option value="all">{t('allTypes')}</option>
 {renderTranslatedOptions(jobTypes)}
 </select>
 </div>
 
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('skills')}</label>
 <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-2">
 {allSkills.map(skill => (
 <label key={getTranslated(skill, 'ko')} className="flex items-center">
 <input
 type="checkbox"
 className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
 checked={selectedSkills.includes(getTranslated(skill, 'ko'))}
 onChange={() => handleSkillChange(getTranslated(skill, 'ko'))}
 />
 <span className="ml-2 text-sm text-slate-600">{getTranslated(skill, language)}</span>
 </label>
 ))}
 </div>
 </div>

 </div>
 <div className="mt-8">
 <button
 type="submit"
 className="w-full bg-slate-800 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
 >
 {t('search')}
 </button>
 </div>
 </form>
 </div>
 );
};

export default SearchBar;
