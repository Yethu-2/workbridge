import React, { useState } from 'react';
import { Employer, TranslatedString } from '../types';
import StarRating from './StarRating';


const EmployerReviewsPage = ({ employers, onSelect, t, language, getTranslated }) => {
 const [searchQuery, setSearchQuery] = useState('');

 const filteredEmployers = employers.filter(employer => {
 const query = searchQuery.toLowerCase();
 return (
 getTranslated(employer.name, 'ko').toLowerCase().includes(query) ||
 getTranslated(employer.name, 'en').toLowerCase().includes(query) ||
 getTranslated(employer.name, 'vi').toLowerCase().includes(query)
 );
 });
 
 return (
 <div className="animate-fade-in max-w-4xl mx-auto">
 <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
 <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('employerReviews')}</h2>
 <p className="text-slate-600 mb-6">{t('employerReviewsSubtitle')}</p>
 <div className="relative">
 <input
 type="text"
 placeholder={t('searchByEmployerPlaceholder')}
 className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 aria-label={t('searchByEmployerPlaceholder')}
 />
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
 </div>
 </div>
 </div>

 <div className="space-y-4">
 {filteredEmployers.map(employer => (
 <div 
 key={employer.id} 
 onClick={() => onSelect(employer)}
 className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300 p-4 flex items-center space-x-4 cursor-pointer"
 role="button"
 tabIndex={0}
 onKeyPress={(e) => e.key === 'Enter' && onSelect(employer)}
 >
 <img src={employer.logo} alt={getTranslated(employer.name, language)} className="w-16 h-16 rounded-full object-cover" />
 <div className="flex-1">
 <h3 className="text-lg font-bold text-slate-800">{getTranslated(employer.name, language)}</h3>
 <p className="text-sm text-slate-500">{getTranslated(employer.industry, language)} &middot; {getTranslated(employer.location, language)}</p>
 </div>
 <div className="text-right">
 <StarRating rating={employer.averageRating} />
 <p className="text-sm text-slate-600 mt-1">{employer.totalReviews} {t('reviewsCount')}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
};

export default EmployerReviewsPage;