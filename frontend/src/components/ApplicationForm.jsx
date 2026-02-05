import React, { useState } from 'react';
import { Job, UserProfile, TranslatedString } from '../types';


const ApplicationForm = ({ job, user, onBack, onSubmit, t, language, getTranslated }) => {
 const [applyWithFriend, setApplyWithFriend] = useState(false);
 const [friendId, setFriendId] = useState('');

 return (
 <div className="bg-gray-900 bg-opacity-60 fixed inset-0 z-50 overflow-y-auto">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center min-h-full">
 <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fade-in max-w-3xl mx-auto w-full">
 <div className="text-center mb-8 pb-4 border-b border-slate-200">
 <h2 className="text-2xl font-bold text-slate-800">{t('applicationFormTitle')}</h2>
 <p className="text-lg text-slate-600 mt-1">{getTranslated(job.title, language)} - {getTranslated(job.employer.name, language)}</p>
 </div>

 <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
 <div className="space-y-8">
 {/* Personal Info */}
 <div>
 <h3 className="text-xl font-bold text-slate-800 mb-4">{t('personalInfo')}</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">{t('fullName')}</label>
 <input type="text" id="fullName" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" readOnly />
 </div>
 <div>
 <label htmlFor="nationality" className="block text-sm font-medium text-slate-700">{t('nationality')}</label>
 <input type="text" id="nationality" defaultValue={getTranslated(user.nationality, language)} className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" readOnly />
 </div>
 <div>
 <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t('email')}</label>
 <input type="email" id="email" placeholder="email@example.com" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div>
 <label htmlFor="phone" className="block text-sm font-medium text-slate-700">{t('phoneNumber')}</label>
 <input type="tel" id="phone" placeholder="010-1234-5678" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 </div>
 </div>
 
 {/* Group Application */}
 <div>
 <label className="flex items-center">
 <input
 type="checkbox"
 className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
 checked={applyWithFriend}
 onChange={(e) => setApplyWithFriend(e.target.checked)}
 />
 <span className="ml-2 text-sm font-medium text-slate-700">{t('applyWithFriend')}</span>
 </label>
 {applyWithFriend && (
 <div className="mt-2">
 <label htmlFor="friendId" className="block text-sm font-medium text-slate-700">{t('friendId')}</label>
 <input
 type="text"
 id="friendId"
 value={friendId}
 onChange={(e) => setFriendId(e.target.value)}
 placeholder="친구의 Workbridge ID 또는 이메일"
 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 />
 </div>
 )}
 </div>

 {/* Employer Questions */}
 {job.applicationQuestions && job.applicationQuestions.length > 0 && (
 <div>
 <h3 className="text-xl font-bold text-slate-800 mb-4">{t('employerQuestions')}</h3>
 <div className="space-y-4">
 {job.applicationQuestions.map(q => (
 <div key={q.id}>
 <label htmlFor={`q-${q.id}`} className="block text-sm font-medium text-slate-700">
 {getTranslated(q.question, language)} {q.required && <span className="text-red-500">*</span>}
 </label>
 {q.type === 'textarea' ? (
 <textarea
 id={`q-${q.id}`}
 rows={4}
 required={q.required}
 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 ></textarea>
 ) : (
 <input
 type="text"
 id={`q-${q.id}`}
 required={q.required}
 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 />
 )}
 </div>
 ))}
 </div>
 </div>
 )}
 
 {/* Confirmation */}
 <div className="flex items-start">
 <div className="flex items-center h-5">
 <input id="confirmation" name="confirmation" type="checkbox" required className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300 rounded" />
 </div>
 <div className="ml-3 text-sm">
 <label htmlFor="confirmation" className="font-medium text-slate-700">{t('confirmTruthfulness')}</label>
 <p className="text-slate-500">{t('confirmTruthfulnessDetail')}</p>
 </div>
 </div>
 </div>

 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-3">
 <button type="button" onClick={onBack} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
 {t('cancel')}
 </button>
 <button type="submit" className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t('submitApplication')}
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 );
};

export default ApplicationForm;
