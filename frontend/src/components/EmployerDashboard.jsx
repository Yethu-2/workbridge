import React, { useState, useMemo } from 'react';

const EmployerDashboard = ({ user, applicants, t, language, getTranslated, onGoToProfile, onPostJobClick, onViewApplicant }) => {
 const [activeTab, setActiveTab] = useState('dashboard');
 const [selectedJob, setSelectedJob] = useState(user.postedJobs[0] || null);
 const [applicantFilterStatus, setApplicantFilterStatus] = useState('all');
 const [applicantSort, setApplicantSort] = useState('newest');

 const filteredAndSortedApplicants = useMemo(() => {
 return [...applicants]
 .filter(applicant => applicantFilterStatus === 'all' || applicant.status === applicantFilterStatus)
 .sort((a, b) => {
 const dateA = new Date(a.appliedDate).getTime();
 const dateB = new Date(b.appliedDate).getTime();
 return applicantSort === 'newest' ? dateB - dateA : dateA - dateB;
 });
 }, [applicants, applicantFilterStatus, applicantSort]);
 
 const totalApplicants = user.postedJobs.length * applicants.length; // Mock total
 const newApplicants = applicants.filter(a => a.status === 'new').length;

 const getTabClass = (tabName) => {
 return `px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
 activeTab === tabName
 ? 'bg-slate-800 text-white'
 : 'text-slate-600 hover:bg-slate-200/70'
 }`;
 };

 const renderDashboardOverview = () => (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h3 className="text-slate-500 text-sm font-medium">진행 중인 공고</h3>
 <p className="text-3xl font-bold text-slate-800 mt-2">{user.postedJobs.length}</p>
 </div>
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h3 className="text-slate-500 text-sm font-medium">총 지원자 수</h3>
 <p className="text-3xl font-bold text-slate-800 mt-2">{totalApplicants}</p>
 </div>
 <div className="bg-white p-6 rounded-lg border border-slate-200 relative">
 <h3 className="text-slate-500 text-sm font-medium">미확인 지원서</h3>
 <p className="text-3xl font-bold text-slate-800 mt-2">{newApplicants}</p>
 {newApplicants > 0 && <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-red-500"></span>}
 </div>
 </div>
 <div className="mt-2">
 <h3 className="text-xl font-bold text-slate-800 mb-4">{t('kpi_title')}</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h4 className="text-slate-500 font-medium">{t('kpi_ai_recommendation_title')}</h4>
 <p className="mt-2 text-slate-600">{t('kpi_ai_recommendation_desc')}</p>
 </div>
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h4 className="text-slate-500 font-medium">{t('kpi_retention_rate_title')}</h4>
 <p className="text-3xl font-bold text-slate-800 mt-2">92%</p>
 </div>
 </div>
 </div>
 </div>
 );
 
 const renderJobListings = () => (
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h3 className="text-xl font-bold text-slate-800 mb-4">채용 공고 관리</h3>
 <div className="divide-y divide-slate-200">
 {user.postedJobs.map(job => (
 <div key={job.id} className="py-4 flex justify-between items-center">
 <div>
 <p className="font-bold text-slate-800">{getTranslated(job.title, language)}</p>
 <p className="text-sm text-slate-500">{getTranslated(job.employer.location, language)} / {getTranslated(job.type, language)}</p>
 </div>
 <div className="flex items-center space-x-4">
 <span className="text-sm font-semibold">{applicants.length}명 지원</span>
 <button onClick={() => { setSelectedJob(job); setActiveTab('applicants');}} className="text-sm font-semibold text-slate-600 hover:text-slate-900">지원자 보기</button>
 <button className="text-sm" onClick={() => alert('Edit/Delete options for this job.')}><i className="fa-solid fa-ellipsis-vertical"></i></button>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 
 const renderApplicants = () => {
 if (!selectedJob) return <div className="bg-white p-6 rounded-lg border border-slate-200 text-center text-slate-500">먼저 채용 공고를 선택해주세요.</div>;

 const statusStyles = {
 new: 'bg-blue-100 text-blue-800',
 reviewed: 'bg-yellow-100 text-yellow-800',
 interviewing: 'bg-purple-100 text-purple-800',
 hired: 'bg-green-100 text-green-800',
 rejected: 'bg-red-100 text-red-800',
 };

 return (
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <div className="mb-6">
 <label htmlFor="job-select" className="block text-sm font-medium text-slate-700 mb-2">채용 공고 선택</label>
 <select
 id="job-select"
 className="w-full md:w-auto p-2 border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-slate-500 focus:border-slate-500"
 value={selectedJob.id}
 onChange={(e) => setSelectedJob(user.postedJobs.find(j => j.id === parseInt(e.target.value)) || null)}
 >
 {user.postedJobs.map(job => (
 <option key={job.id} value={job.id}>{getTranslated(job.title, language)}</option>
 ))}
 </select>
 </div>

 <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200/80 gap-4">
 <div className="flex items-center space-x-2">
 <label htmlFor="status-filter" className="text-sm font-medium text-slate-600">상태:</label>
 <select
 id="status-filter"
 className="p-2 border border-slate-300 rounded-md text-sm focus:ring-slate-500 focus:border-slate-500"
 value={applicantFilterStatus}
 onChange={(e) => setApplicantFilterStatus(e.target.value)}
 >
 <option value="all">전체</option>
 <option value="new">New</option>
 <option value="reviewed">Reviewed</option>
 <option value="interviewing">Interviewing</option>
 <option value="hired">Hired</option>
 <option value="rejected">Rejected</option>
 </select>
 </div>
 <div className="flex items-center space-x-2">
 <label htmlFor="date-sort" className="text-sm font-medium text-slate-600">정렬:</label>
 <select
 id="date-sort"
 className="p-2 border border-slate-300 rounded-md text-sm focus:ring-slate-500 focus:border-slate-500"
 value={applicantSort}
 onChange={(e) => setApplicantSort(e.target.value)}
 >
 <option value="newest">최신순</option>
 <option value="oldest">오래된순</option>
 </select>
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-500">
 <thead className="text-xs text-slate-700 uppercase bg-slate-50">
 <tr>
 <th scope="col" className="px-6 py-3">지원자</th>
 <th scope="col" className="px-6 py-3">지원일</th>
 <th scope="col" className="px-6 py-3">상태</th>
 <th scope="col" className="px-6 py-3">액션</th>
 </tr>
 </thead>
 <tbody>
 {filteredAndSortedApplicants.map(applicant => (
 <tr key={applicant.id} className="bg-white border-b hover:bg-slate-50">
 <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
 <div className="flex items-center">
 <img className="w-10 h-10 rounded-full" src={applicant.avatar} alt={applicant.name} />
 <div className="pl-3">
 <div className="font-semibold">{applicant.name}</div>
 <div className="font-normal text-slate-500">{getTranslated(applicant.nationality, language)}</div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">{applicant.appliedDate}</td>
 <td className="px-6 py-4">
 <span className={`px-2 py-1 font-semibold text-xs rounded-full ${statusStyles[applicant.status]}`}>
 {applicant.status}
 </span>
 </td>
 <td className="px-6 py-4">
 <button onClick={() => onViewApplicant(applicant.id)} className="font-medium text-slate-600 hover:underline">{t('viewProfile')}</button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {filteredAndSortedApplicants.length === 0 && (
 <div className="text-center py-16 text-slate-500">
 <i className="fa-solid fa-user-slash text-3xl mb-2"></i>
 <p>해당 조건에 맞는 지원자가 없습니다.</p>
 </div>
 )}
 </div>
 </div>
 )
 };


 const renderContent = () => {
 switch (activeTab) {
 case 'dashboard':
 return renderDashboardOverview();
 case 'listings':
 return renderJobListings();
 case 'applicants':
 return renderApplicants();
 default:
 return null;
 }
 };

 return (
 <div className="animate-fade-in max-w-7xl mx-auto">
 <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 pb-8 border-b border-slate-200">
 <img src={user.companyLogo} alt={getTranslated(user.companyName, language)} className="w-24 h-24 rounded-lg object-cover border" />
 <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
 <h2 className="text-3xl font-bold text-slate-800">{getTranslated(user.companyName, language)}</h2>
 <p className="text-lg text-slate-500">환영합니다, {user.name}님!</p>
 </div>
 </div>
 
 <div className="mb-8 p-6 bg-white rounded-lg border border-slate-200">
 <h3 className="text-lg font-bold text-slate-800 mb-3">빠른 시작</h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <button onClick={onPostJobClick} className="text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
 <i className="fa-solid fa-plus-circle text-emerald-500 text-xl mb-2"></i>
 <p className="font-semibold text-slate-800">{t('postAJob')}</p>
 <p className="text-sm text-slate-500">새로운 채용 공고를 등록하세요.</p>
 </button>
 <button onClick={() => setActiveTab('applicants')} className="text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
 <i className="fa-solid fa-users text-emerald-500 text-xl mb-2"></i>
 <p className="font-semibold text-slate-800">지원자 관리</p>
 <p className="text-sm text-slate-500">지원서를 검토하고 상태를 변경하세요.</p>
 </button>
 <button onClick={onGoToProfile} className="text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
 <i className="fa-solid fa-building text-emerald-500 text-xl mb-2"></i>
 <p className="font-semibold text-slate-800">기업 프로필 관리</p>
 <p className="text-sm text-slate-500">기업 정보를 최신으로 유지하세요.</p>
 </button>
 </div>
 </div>


 <div className="mb-6">
 <nav className="p-1 bg-slate-100/80 rounded-lg flex space-x-1 max-w-sm">
 <button className={getTabClass('dashboard')} onClick={() => setActiveTab('dashboard')}>대시보드</button>
 <button className={getTabClass('listings')} onClick={() => setActiveTab('listings')}>채용 공고</button>
 <button className={getTabClass('applicants')} onClick={() => setActiveTab('applicants')}>지원자</button>
 </nav>
 </div>

 <div>
 {renderContent()}
 </div>
 </div>
 );
};

export default EmployerDashboard;
