import React from 'react';


const PlatformPolicyPage = ({ t }) => {
 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-10">
 <i className="fa-solid fa-shield-halved text-5xl text-slate-500"></i>
 <h2 className="text-3xl font-bold text-slate-800 mt-4">{t('policy_title')}</h2>
 <p className="text-lg text-slate-600 mt-2 max-w-3xl mx-auto">{t('policy_subtitle')}</p>
 </div>

 {/* Review Management Policy */}
 <section className="mb-12">
 <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b-2 border-slate-200 pb-3">{t('reviewPolicy_title')}</h3>
 
 <div className="space-y-8">
 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('reviewPolicy_eligibility_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('reviewPolicy_eligibility_p1')}</li>
 <li>{t('reviewPolicy_eligibility_p2')}</li>
 <li>{t('reviewPolicy_eligibility_p3')}</li>
 </ul>
 </div>

 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('reviewPolicy_structured_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('reviewPolicy_structured_p1')}</li>
 <li>{t('reviewPolicy_structured_p2')}</li>
 </ul>
 </div>

 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('reviewPolicy_reply_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('reviewPolicy_reply_p1')}</li>
 <li>{t('reviewPolicy_reply_p2')}</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Talent Selection & Value Enhancement */}
 <section>
 <h3 className="text-2xl font-bold text-slate-700 mb-6 border-b-2 border-slate-200 pb-3">{t('talentPolicy_title')}</h3>

 <div className="space-y-8">
 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('talentPolicy_vetting_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('talentPolicy_vetting_p1')}</li>
 <li>{t('talentPolicy_vetting_p2')}</li>
 </ul>
 </div>

 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('talentPolicy_screening_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('talentPolicy_screening_p1')}</li>
 <li>{t('talentPolicy_screening_p2')}</li>
 </ul>
 </div>

 <div>
 <h4 className="text-xl font-semibold text-slate-800 mb-3">{t('talentPolicy_consulting_title')}</h4>
 <ul className="list-disc list-inside space-y-2 text-slate-600">
 <li>{t('talentPolicy_consulting_p1')}</li>
 <li>{t('talentPolicy_consulting_p2')}</li>
 </ul>
 </div>
 </div>
 </section>
 </div>
 );
};

export default PlatformPolicyPage;