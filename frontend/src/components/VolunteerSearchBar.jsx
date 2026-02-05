import React, { useState } from 'react';

const VolunteerSearchBar = ({ t, onSearch, locations, industries, language, getTranslated }) => {
 const [keyword, setKeyword] = useState('');
 const [location, setLocation] = useState('all');
 const [industry, setIndustry] = useState('all');
 const [duration, setDuration] = useState('all');

 const handleSubmit = (e) => {
 e.preventDefault();
 onSearch({ keyword, location, industry, duration });
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
 <div className="bg-white p-6 rounded-xl border border-slate-200">
 <form onSubmit={handleSubmit}>
 <div className="space-y-4">
 <div>
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
 placeholder={t('volunteerSearchPlaceholder')}
 />
 </div>
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
 <label htmlFor="duration" className="block text-sm font-medium text-slate-700">{t('duration')}</label>
 <select id="duration" name="duration" className={selectClasses} value={duration} onChange={(e) => setDuration(e.target.value)}>
 <option value="all">{t('allDurations')}</option>
 <option value="short">{t('shortTerm')}</option>
 <option value="long">{t('longTerm')}</option>
 </select>
 </div>
 </div>
 <div className="mt-6">
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

export default VolunteerSearchBar;