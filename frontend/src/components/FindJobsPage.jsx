import React from 'react';
import SearchBar from './SearchBar';
import JobCard from './JobCard';

const FindJobsPage = ({
 jobs, filters, onSearch, onSelectJob, onToggleBookmark, t, language, getTranslated, platformDirection,
 uniqueLocations, uniqueIndustries, uniqueJobTypes, skills
}) => {
 return (
 <div className="animate-fade-in">
 {/* Hero Section */}
 <div className="bg-slate-50 border-b border-slate-200/80">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
 {platformDirection === 'vn-to-kr' ? t('heroTitle_vn_to_kr') : t('heroTitle_kr_to_vn')}
 </h1>
 <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
 {platformDirection === 'vn-to-kr' ? t('heroSubtitle_vn_to_kr') : t('heroSubtitle_kr_to_vn')}
 </p>
 </div>
 </div>

 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 {/* Filters Column */}
 <div className="lg:col-span-4 xl:col-span-3">
 <div className="sticky top-24">
 <SearchBar
 t={t}
 onSearch={onSearch}
 locations={uniqueLocations}
 industries={uniqueIndustries}
 jobTypes={uniqueJobTypes}
 skills={skills}
 language={language}
 getTranslated={getTranslated}
 />
 </div>
 </div>

 {/* Job Listings Column */}
 <div className="lg:col-span-8 xl:col-span-9">
 <div className="mb-6">
 <h2 className="text-xl font-bold text-slate-800">
 {jobs.length}개의 일자리를 찾았습니다.
 </h2>
 </div>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
 {jobs.map(job => (
 <JobCard 
 key={job.id} 
 job={job} 
 onSelect={onSelectJob} 
 onToggleBookmark={onToggleBookmark} 
 t={t} 
 language={language} 
 getTranslated={getTranslated} 
 />
 ))}
 </div>
 {jobs.length === 0 && (
 <div className="text-center py-24 bg-slate-50 rounded-lg border border-slate-200/80">
 <i className="fa-solid fa-folder-open text-4xl text-slate-400"></i>
 <p className="mt-4 text-slate-600 font-semibold">검색 조건에 맞는 일자리가 없습니다.</p>
 <p className="text-sm text-slate-500">다른 키워드나 필터를 사용해보세요.</p>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
};

export default FindJobsPage;
