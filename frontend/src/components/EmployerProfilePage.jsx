import React from 'react';
import { EmployerProfile, TranslatedString } from '../types';
import StarRating from './StarRating';


const EmployerProfilePage = ({ user, onBack, t, language, getTranslated }) => {
 
 // Mock employer data from a job associated with the user
 const representativeEmployerData = user.postedJobs.length > 0 ? user.postedJobs[0].employer : null;

 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <button onClick={onBack} className="text-slate-600 hover:text-slate-900 mb-6 flex items-center text-sm font-semibold">
 <i className="fa-solid fa-arrow-left mr-2"></i> {t('dashboard')}
 </button>
 <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 pb-8 border-b border-gray-200">
 <img src={user.companyLogo} alt={getTranslated(user.companyName, language)} className="w-32 h-32 rounded-lg object-cover ring-4 ring-slate-100" />
 <div className="sm:ml-8 mt-4 sm:mt-0 text-center sm:text-left">
 <h2 className="text-3xl font-bold text-slate-800">{getTranslated(user.companyName, language)}</h2>
 {representativeEmployerData && (
 <>
 <p className="text-lg text-slate-500">{getTranslated(representativeEmployerData.industry, language)}</p>
 <div className="flex items-center mt-2 justify-center sm:justify-start">
 <StarRating rating={representativeEmployerData.averageRating} />
 <span className="ml-3 font-bold text-slate-700">{representativeEmployerData.averageRating.toFixed(1)}</span>
 <span className="ml-1 text-sm text-slate-500">({representativeEmployerData.totalReviews} {t('reviewsCount')})</span>
 </div>
 </>
 )}
 <button onClick={() => alert('프로필 수정 기능은 준비 중입니다.')} className="mt-4 bg-slate-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t('editProfile')}
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-slate-50/70 border border-slate-200 p-6 rounded-lg">
 <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3">담당자 정보</h3>
 <div className="space-y-4 text-slate-700">
 <div className="flex items-center"><i className="fa-solid fa-user-tie text-slate-400 w-6"></i><span className="font-semibold text-slate-600 mr-2">이름:</span><span>{user.name}</span></div>
 <div className="flex items-center"><i className="fa-solid fa-envelope text-slate-400 w-6"></i><span className="font-semibold text-slate-600 mr-2">이메일:</span><span>employer@example.com</span></div>
 <div className="flex items-center"><i className="fa-solid fa-phone text-slate-400 w-6"></i><span className="font-semibold text-slate-600 mr-2">연락처:</span><span>010-1234-5678</span></div>
 </div>
 </div>

 <div className="bg-slate-50/70 border border-slate-200 p-6 rounded-lg">
 <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3">회사 정보</h3>
 <div className="space-y-4 text-slate-700">
 {representativeEmployerData && (
 <div className="flex items-center"><i className="fa-solid fa-location-dot text-slate-400 w-6"></i><span className="font-semibold text-slate-600 mr-2">주소:</span><span>{getTranslated(representativeEmployerData.location, language)}</span></div>
 )}
 <div className="flex items-center"><i className="fa-solid fa-building text-slate-400 w-6"></i><span className="font-semibold text-slate-600 mr-2">산업군:</span><span>{getTranslated(representativeEmployerData?.industry, language)}</span></div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default EmployerProfilePage;
