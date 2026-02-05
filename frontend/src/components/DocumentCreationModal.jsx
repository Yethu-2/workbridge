import React from 'react';


const DocumentCreationModal = ({ documentType, onClose, onSubmit, t }) => {
 
 const getTitle = () => {
 switch (documentType) {
 case 'contract': return t('docModal_title_contract');
 case 'invitation': return t('create_invitation');
 case 'accommodation': return t('create_accommodation');
 default: return '';
 }
 };

 const renderFormFields = () => {
 switch (documentType) {
 case 'contract':
 return (
 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_employerName')}</label>
 <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_employerAddress')}</label>
 <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_employeeName')}</label>
 <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_employeePassport')}</label>
 <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_contractPeriod')}</label>
 <input type="text" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_salary')}</label>
 <input type="text" placeholder="e.g., 2,500,000 KRW/month" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-slate-700">{t('docModal_workingHours')}</label>
 <input type="text" placeholder="e.g., 09:00 - 18:00" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm" />
 </div>
 </div>
 );
 case 'invitation':
 return <p className="text-slate-600 text-center py-8">Invitation letter form fields will be here.</p>;
 case 'accommodation':
 return <p className="text-slate-600 text-center py-8">Accommodation confirmation form fields will be here.</p>;
 default: return null;
 }
 }


 return (
 <div className="bg-gray-900 bg-opacity-60 fixed inset-0 z-50 overflow-y-auto">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center min-h-full">
 <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fade-in max-w-2xl mx-auto w-full">
 <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
 <h2 className="text-2xl font-bold text-slate-800">{getTitle()}</h2>
 <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
 <i className="fa-solid fa-xmark text-2xl"></i>
 </button>
 </div>

 <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
 <div className="max-h-[60vh] overflow-y-auto pr-4">
 {renderFormFields()}
 </div>
 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-3">
 <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
 {t('docModal_close')}
 </button>
 <button type="submit" className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t('docModal_generate')}
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 );
};

export default DocumentCreationModal;