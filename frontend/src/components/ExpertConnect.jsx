import React from 'react';


const ExpertConnect = ({ t }) => {
 // Mock data for experts
 const experts = [
 {
 name: '김철수 변호사',
 specialty: '노동법, 비자',
 description: '10년 경력의 노동법 전문 변호사입니다. 부당해고, 임금체불 등 문제 발생 시 상담해드립니다.',
 avatar: 'https://picsum.photos/seed/expert1/100'
 },
 {
 name: '박영희 행정사',
 specialty: 'E-7/E-9 비자 전문',
 description: '복잡한 비자 서류 준비부터 발급까지 전 과정을 도와드립니다. 비자 연장, 체류자격 변경 문의도 환영합니다.',
 avatar: 'https://picsum.photos/seed/expert2/100'
 },
 ];

 return (
 <div className="mt-10">
 <h3 className="text-2xl font-bold text-slate-800 mb-4">{t('expert_connect_title')}</h3>
 <p className="text-slate-600 mb-6">{t('expert_connect_subtitle')}</p>
 <div className="space-y-6">
 {experts.map((expert, index) => (
 <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-start space-x-4">
 <img src={expert.avatar} alt={expert.name} className="w-16 h-16 rounded-full object-cover" />
 <div className="flex-1">
 <div className="flex justify-between items-start">
 <div>
 <h4 className="font-bold text-lg text-slate-800">{expert.name}</h4>
 <p className="text-sm font-semibold text-emerald-600">{expert.specialty}</p>
 </div>
 <button className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300 text-sm">
 {t('contact_expert')}
 </button>
 </div>
 <p className="mt-2 text-slate-600">{expert.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
};

export default ExpertConnect;
