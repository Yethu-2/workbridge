import React from 'react';


const AdBanner = ({ t }) => {
 return (
 <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 my-8 text-white flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
 <div className="mb-4 sm:mb-0">
 <h3 className="text-xl font-bold">{t('adBannerTitle')}</h3>
 <p className="text-slate-300 mt-1">{t('adBannerSubtitle')}</p>
 </div>
 <button className="bg-white text-slate-800 font-bold py-2 px-5 rounded-lg hover:bg-slate-200 transition duration-300 transform hover:scale-105 whitespace-nowrap">
 {t('adBannerCta')}
 </button>
 </div>
 );
};

export default AdBanner;