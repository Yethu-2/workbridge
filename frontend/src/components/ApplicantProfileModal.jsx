import React from 'react';
import { UserProfile, TranslatedString } from '../types';
import StarRating from './StarRating';


const ProgressBar = ({ value, color, label }) => (
 <div>
 <div className="flex justify-between items-center mb-1">
 <h5 className="text-sm font-medium text-slate-600">{label}</h5>
 <span className="text-sm font-bold text-slate-700">{value}{label.includes('%') ? '%' : ''}</span>
 </div>
 <div className="w-full bg-slate-200 rounded-full h-2">
 <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
 </div>
 </div>
);

const ApplicantProfileModal = ({ applicant, onClose, t, language, getTranslated }) => {
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
 <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-3xl m-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
 <div className="relative p-6 md:p-8">
 <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10">
 <i className="fas fa-times fa-lg"></i>
 </button>
 <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">{t('applicant_profile')}</h2>
 
 <div className="max-h-[80vh] overflow-y-auto pr-4">
 <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 pb-6 border-b border-slate-200">
 <img src={applicant.avatar} alt={applicant.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md" />
 <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
 <h3 className="text-2xl font-bold text-slate-800">{applicant.name}</h3>
 <p className="text-md text-slate-500">{getTranslated(applicant.nationality, language)} &middot; {applicant.age} {t('age')}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Left Column */}
 <div className="space-y-6">
 <div className="bg-white p-4 rounded-lg border border-slate-200">
 <h4 className="font-bold text-slate-800 mb-2">{t('self_introduction')}</h4>
 <p className="text-slate-600 text-sm leading-relaxed">{getTranslated(applicant.selfIntroduction, language)}</p>
 </div>
 <div className="bg-white p-4 rounded-lg border border-slate-200">
 <h4 className="font-bold text-slate-800 mb-3">{t('skills')}</h4>
 <div className="flex flex-wrap gap-2">
 {applicant.skills?.map((skill, index) => (
 <span key={index} className="bg-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full">
 {getTranslated(skill, language)}
 </span>
 ))}
 </div>
 </div>
 </div>
 {/* Right Column */}
 <div className="space-y-6">
 {applicant.wpReady && (
 <div className="bg-white p-4 rounded-lg border border-slate-200">
 <h4 className="font-bold text-slate-800 mb-3">{t('wpReady_title')}</h4>
 <div className="space-y-4">
 <ProgressBar value={Math.round((applicant.wpReady.koreanLevel / 6) * 100)} color="bg-blue-500" label={`${t('koreanLevel')} (TOPIK ${applicant.wpReady.koreanLevel})`} />
 <ProgressBar value={applicant.wpReady.trainingCompletion} color="bg-emerald-500" label={`${t('trainingCompletion')}`} />
 <ProgressBar value={applicant.wpReady.behavioralScore} color="bg-amber-500" label={`${t('behavioralScore')}`} />
 </div>
 </div>
 )}
 <div className="bg-white p-4 rounded-lg border border-slate-200">
 <h4 className="font-bold text-slate-800 mb-3">{t('review_history')}</h4>
 {applicant.reviewHistory && applicant.reviewHistory.length > 0 ? (
 <div className="space-y-3">
 {applicant.reviewHistory.map((review, index) => (
 <div key={index} className="border-b border-slate-100 pb-2 last:border-b-0">
 <div className="flex justify-between items-center">
 <span className="font-semibold text-sm text-slate-700">{getTranslated(review.employerName, language)}</span>
 <StarRating rating={review.rating} size="sm" />
 </div>
 <p className="text-xs text-slate-500 italic mt-1">"{getTranslated(review.comment, language)}"</p>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-sm text-slate-500 text-center py-4">{t('no_review_history')}</p>
 )}
 </div>
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>
 );
};

export default ApplicantProfileModal;