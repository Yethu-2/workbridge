import React from 'react';
import { VolunteerOpportunity, TranslatedString } from '../types';


const VolunteerCard = ({ opportunity, onToggleBookmark, t, language, getTranslated }) => {
 const handleBookmarkClick = (e) => {
 e.stopPropagation();
 onToggleBookmark(opportunity.id);
 };

 return (
 <div
 className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-300 p-6 cursor-pointer group relative"
 >
 <button 
 onClick={handleBookmarkClick}
 className={`absolute top-4 right-4 text-2xl z-10 ${opportunity.isBookmarked ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-400'} transition-colors`}
 aria-label={opportunity.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
 >
 <i className={`${opportunity.isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark`}></i>
 </button>

 <div className="flex items-start">
 <img src={opportunity.logo} alt={getTranslated(opportunity.organization, language)} className="w-16 h-16 rounded-full mr-4 object-cover" />
 <div className="flex-1">
 <div className="flex justify-between items-center">
 <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 pr-8">{getTranslated(opportunity.title, language)}</h3>
 <span className="text-xs font-semibold bg-sky-100 text-sky-800 px-2 py-1 rounded-full whitespace-nowrap">{t('volunteer')}</span>
 </div>
 <p className="text-slate-600 font-semibold">{getTranslated(opportunity.organization, language)}</p>
 <p className="text-sm text-slate-500 mt-1">{getTranslated(opportunity.location, language)}</p>
 </div>
 </div>
 <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-end">
 <div>
 <p className="text-sm text-slate-500 flex items-center">
 <i className="fa-regular fa-calendar-days mr-2 text-slate-400"></i>
 {getTranslated(opportunity.duration, language)}
 </p>
 {opportunity.dueDate && (
 <p className="text-xs text-slate-500 mt-1 flex items-center">
 <i className="fa-regular fa-calendar-xmark mr-1.5 text-slate-400"></i>
 {t('dueDate')}: {opportunity.dueDate}
 </p>
 )}
 </div>
 <div className="text-slate-600 group-hover:text-slate-900 text-sm font-semibold transition-colors">
 {t('viewDetails')} <i className="fa-solid fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
 </div>
 </div>
 </div>
 );
};

export default VolunteerCard;