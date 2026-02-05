import React from 'react';


const InfoCard = ({ icon, title, children }) => (
 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
 <div className="flex items-center mb-3">
 <i className={`fa-solid ${icon} text-xl text-slate-500 mr-4 w-8 text-center`}></i>
 <h4 className="font-bold text-lg text-slate-800">{title}</h4>
 </div>
 <div className="pl-12 text-slate-600 space-y-2">
 {children}
 </div>
 </div>
);

const LegalGuidePage = ({ t }) => {
 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-12">
 <i className="fa-solid fa-scale-balanced text-5xl text-slate-400"></i>
 <h2 className="text-3xl font-bold text-slate-800 mt-4">{t('legalGuide_title')}</h2>
 <p className="text-lg text-slate-600 mt-2 max-w-3xl mx-auto">{t('legalGuide_subtitle')}</p>
 </div>
 
 <div className="space-y-8">
 <InfoCard icon="fa-passport" title={t('legalGuide_visa_title')}>
 <p>{t('legalGuide_visa_desc_e7')}</p>
 <p>{t('legalGuide_visa_desc_e9')}</p>
 </InfoCard>

 <InfoCard icon="fa-hand-holding-dollar" title={t('legalGuide_wage_title')}>
 <p>{t('legalGuide_wage_desc')}</p>
 </InfoCard>
 
 <InfoCard icon="fa-file-signature" title={t('legalGuide_contract_title')}>
 <p>{t('legalGuide_contract_desc')}</p>
 </InfoCard>
 </div>

 </div>
 );
};

export default LegalGuidePage;