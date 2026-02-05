import React from 'react';


const VolunteerPostFormModal = ({ onClose, onSubmit, t }) => {
 const handleSubmit = (e) => {
 e.preventDefault();
 onSubmit();
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
 <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
 <div className="relative p-6 md:p-8">
 <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10">
 <i className="fas fa-times fa-lg"></i>
 </button>
 <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">{t('volunteer_form_title')}</h2>

 <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
 <div>
 <label htmlFor="orgName" className="block text-sm font-medium text-slate-700">{t('volunteer_form_org_name')}</label>
 <input type="text" id="orgName" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div>
 <label htmlFor="title" className="block text-sm font-medium text-slate-700">{t('volunteer_form_post_title')}</label>
 <input type="text" id="title" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label htmlFor="location" className="block text-sm font-medium text-slate-700">{t('volunteer_form_location')}</label>
 <input type="text" id="location" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div>
 <label htmlFor="duration" className="block text-sm font-medium text-slate-700">{t('volunteer_form_duration')}</label>
 <input type="text" id="duration" placeholder="예: 3개월, 2024-08-01 ~ 2024-10-31" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 </div>
 <div>
 <label htmlFor="description" className="block text-sm font-medium text-slate-700">{t('volunteer_form_description')}</label>
 <textarea id="description" rows={4} required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"></textarea>
 </div>
 <div>
 <label htmlFor="tasks" className="block text-sm font-medium text-slate-700">{t('volunteer_form_tasks')}</label>
 <input type="text" id="tasks" placeholder="예: 작물 재배, 시설 관리, 교육 보조" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div>
 <label htmlFor="benefits" className="block text-sm font-medium text-slate-700">{t('volunteer_form_benefits')}</label>
 <input type="text" id="benefits" placeholder="예: 숙식 제공, 문화 체험, 봉사 인증서" required className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
 <button type="submit" className="w-full sm:w-auto bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors duration-300">
 {t('volunteer_form_submit')}
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 );
};

export default VolunteerPostFormModal;
