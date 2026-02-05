import React from 'react';


const ForEmployersPage = ({ direction, onCreateDocument, t }) => {

 const vnToKrDocs = [
 { name: t('govDocs_vn_to_kr_1_name'), desc: t('govDocs_vn_to_kr_1_desc') },
 { name: t('govDocs_vn_to_kr_2_name'), desc: t('govDocs_vn_to_kr_2_desc') },
 { name: t('govDocs_vn_to_kr_3_name'), desc: t('govDocs_vn_to_kr_3_desc') },
 { name: t('govDocs_vn_to_kr_4_name'), desc: t('govDocs_vn_to_kr_4_desc') },
 ];

 const krToVnDocs = [
 { name: t('govDocs_kr_to_vn_1_name'), desc: t('govDocs_kr_to_vn_1_desc') },
 { name: t('govDocs_kr_to_vn_2_name'), desc: t('govDocs_kr_to_vn_2_desc') },
 { name: t('govDocs_kr_to_vn_3_name'), desc: t('govDocs_kr_to_vn_3_desc') },
 { name: t('govDocs_kr_to_vn_4_name'), desc: t('govDocs_kr_to_vn_4_desc') },
 ];
 
 const currentDocs = direction === 'vn-to-kr' ? vnToKrDocs : krToVnDocs;
 const currentDocsTitle = direction === 'vn-to-kr' ? t('govDocs_vn_to_kr_title') : t('govDocs_kr_to_vn_title');

 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-10">
 <i className="fa-solid fa-briefcase text-5xl text-slate-500"></i>
 <h2 className="text-3xl font-bold text-slate-800 mt-4">{t('forEmployers_title')}</h2>
 <p className="text-lg text-slate-600 mt-2 max-w-2xl mx-auto">{t('forEmployers_subtitle')}</p>
 </div>

 {/* Government Required Documents */}
 <div className="bg-slate-50/70 border border-slate-200 p-6 rounded-lg mb-10">
 <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b-2 border-slate-200 pb-3">{t('govDocs_title')}</h3>
 <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
 <h4 className="font-bold text-lg text-slate-700 mb-4">{currentDocsTitle}</h4>
 <ul className="space-y-4">
 {currentDocs.map((doc, index) => (
 <li key={index} className="flex items-start">
 <i className="fa-regular fa-file-lines text-slate-400 mt-1 mr-4"></i>
 <div>
 <p className="font-semibold text-slate-800">{doc.name}</p>
 <p className="text-sm text-slate-600">{doc.desc}</p>
 </div>
 </li>
 ))}
 </ul>
 </div>
 </div>
 
 {/* Document Creation Tools */}
 <div>
 <h3 className="text-2xl font-bold text-slate-700 mb-2">{t('docTools_title')}</h3>
 <p className="text-slate-600 mb-6">{t('docTools_subtitle')}</p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <button onClick={() => onCreateDocument('contract')} className="bg-slate-800 text-white font-semibold py-4 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex flex-col items-center justify-center text-center">
 <i className="fa-solid fa-file-signature text-2xl mb-2"></i>
 <span>{t('create_contract')}</span>
 </button>
 <button onClick={() => onCreateDocument('invitation')} className="bg-slate-800 text-white font-semibold py-4 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex flex-col items-center justify-center text-center">
 <i className="fa-solid fa-envelope-open-text text-2xl mb-2"></i>
 <span>{t('create_invitation')}</span>
 </button>
 <button onClick={() => onCreateDocument('accommodation')} className="bg-slate-800 text-white font-semibold py-4 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex flex-col items-center justify-center text-center">
 <i className="fa-solid fa-house-chimney text-2xl mb-2"></i>
 <span>{t('create_accommodation')}</span>
 </button>
 </div>
 </div>

 </div>
 );
};

export default ForEmployersPage;