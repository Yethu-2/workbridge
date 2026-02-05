import React from 'react';
import VolunteerCard from './VolunteerCard';
import VolunteerSearchBar from './VolunteerSearchBar';

const VolunteerPage = ({ 
 opportunities, onToggleBookmark, onPostOpportunity, t, language, getTranslated, onSearch, uniqueLocations, uniqueIndustries, userRole
}) => {
 return (
 <div className="animate-fade-in">
 {/* Hero Section */}
 <div className="relative bg-slate-800 text-white overflow-hidden">
 <div className="absolute inset-0">
 <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop" alt="Volunteers working together" className="w-full h-full object-cover opacity-30" />
 </div>
 <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter !leading-tight">
 {t('volunteer_title')}
 </h1>
 <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200">
 {t('volunteer_subtitle')}
 </p>
 </div>
 </div>
 
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Filters Column */}
 <div className="lg:col-span-4 xl:col-span-3">
 <div className="sticky top-24 space-y-6">
 <VolunteerSearchBar
 t={t}
 onSearch={onSearch}
 locations={uniqueLocations}
 industries={uniqueIndustries}
 language={language}
 getTranslated={getTranslated}
 />
 {userRole === 'employer' && (
 <button onClick={onPostOpportunity} className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition duration-300 flex items-center justify-center">
 <i className="fa-solid fa-plus-circle mr-2"></i>
 {t('post_volunteer_opportunity')}
 </button>
 )}
 </div>
 </div>

 {/* Listings Column */}
 <div className="lg:col-span-8 xl:col-span-9">
 <div className="mb-4">
 <h2 className="text-xl font-bold text-slate-800">
 {opportunities.length}개의 봉사활동을 찾았습니다.
 </h2>
 </div>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
 {opportunities.map(opp => (
 <VolunteerCard 
 key={opp.id} 
 opportunity={opp} 
 onToggleBookmark={onToggleBookmark}
 t={t} 
 language={language} 
 getTranslated={getTranslated} 
 />
 ))}
 </div>
 {opportunities.length === 0 && (
 <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
 <i className="fa-solid fa-folder-open text-4xl text-slate-400"></i>
 <p className="mt-4 text-slate-600 font-semibold">검색 조건에 맞는 봉사활동이 없습니다.</p>
 <p className="text-sm text-slate-500">다른 키워드나 필터를 사용해보세요.</p>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
};

export default VolunteerPage;
