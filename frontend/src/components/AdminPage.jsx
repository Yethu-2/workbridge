import React, { useState } from 'react';
import StarRating from './StarRating';

const AdminPage = ({ users, jobs, reviews, t, language, getTranslated }) => {
 const [activeTab, setActiveTab] = useState('dashboard');

 const getTabClass = (tabName) => {
 return `px-4 py-3 text-sm font-bold text-center transition-colors duration-200 ease-in-out border-b-4 ${
 activeTab === tabName
 ? 'border-slate-800 text-slate-800'
 : 'border-transparent text-slate-500 hover:text-slate-700'
 }`;
 };
 
 const StatCard = ({ title, value, icon }) => (
 <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-center space-x-4">
 <div className="bg-slate-100 p-4 rounded-full">
 <i className={`fa-solid ${icon} text-2xl text-slate-600`}></i>
 </div>
 <div>
 <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
 <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
 </div>
 </div>
 );

 const renderDashboard = () => (
 <div className="space-y-6">
 <h2 className="text-2xl font-bold text-slate-800">관리자 대시보드</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 <StatCard title="총 사용자 수" value={users.length} icon="fa-users" />
 <StatCard title="총 채용 공고 수" value={jobs.length} icon="fa-briefcase" />
 <StatCard title="총 리뷰 수" value={reviews.length} icon="fa-star" />
 <StatCard title="오늘 방문자 수" value="1,234" icon="fa-chart-line" />
 </div>
 {/* Placeholder for charts */}
 <div className="bg-white p-6 rounded-lg border border-slate-200 h-64 flex items-center justify-center text-slate-400">
 사용자 증가 추이 차트 (예정)
 </div>
 </div>
 );

 const renderUserManagement = () => (
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h2 className="text-xl font-bold text-slate-800 mb-4">사용자 관리</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-500">
 <thead className="text-xs text-slate-700 uppercase bg-slate-50">
 <tr>
 <th className="px-6 py-3">이름</th>
 <th className="px-6 py-3">역할</th>
 <th className="px-6 py-3">국적</th>
 <th className="px-6 py-3">액션</th>
 </tr>
 </thead>
 <tbody>
 {users.map((user, index) => (
 <tr key={index} className="bg-white border-b hover:bg-slate-50">
 <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
 <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
 {user.name}
 </td>
 <td className="px-6 py-4">
 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
 user.role === 'admin' ? 'bg-red-100 text-red-800' : 
 user.role === 'employer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
 }`}>{user.role}</span>
 </td>
 <td className="px-6 py-4">{getTranslated(user.nationality, language)}</td>
 <td className="px-6 py-4 space-x-2">
 <button className="text-slate-500 hover:text-slate-800"><i className="fa-solid fa-pen-to-square"></i></button>
 <button onClick={() => alert(`${user.name} 사용자를 삭제합니다.`)} className="text-red-500 hover:text-red-800"><i className="fa-solid fa-trash-can"></i></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );

 const renderJobManagement = () => (
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h2 className="text-xl font-bold text-slate-800 mb-4">채용 공고 관리</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-500">
 <thead className="text-xs text-slate-700 uppercase bg-slate-50">
 <tr>
 <th className="px-6 py-3">공고명</th>
 <th className="px-6 py-3">고용주</th>
 <th className="px-6 py-3">상태</th>
 <th className="px-6 py-3">액션</th>
 </tr>
 </thead>
 <tbody>
 {jobs.map(job => (
 <tr key={job.id} className="bg-white border-b hover:bg-slate-50">
 <td className="px-6 py-4 font-medium text-slate-900">{getTranslated(job.title, language)}</td>
 <td className="px-6 py-4">{getTranslated(job.employer.name, language)}</td>
 <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">승인됨</span></td>
 <td className="px-6 py-4 space-x-2">
 <button onClick={() => alert(`'${getTranslated(job.title, language)}' 공고를 삭제합니다.`)} className="text-red-500 hover:text-red-800"><i className="fa-solid fa-trash-can"></i></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
 
 const renderReviewManagement = () => (
 <div className="bg-white p-6 rounded-lg border border-slate-200">
 <h2 className="text-xl font-bold text-slate-800 mb-4">리뷰 관리</h2>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left text-slate-500">
 <thead className="text-xs text-slate-700 uppercase bg-slate-50">
 <tr>
 <th className="px-6 py-3">리뷰어</th>
 <th className="px-6 py-3">고용주</th>
 <th className="px-6 py-3">평점</th>
 <th className="px-6 py-3">내용</th>
 <th className="px-6 py-3">액션</th>
 </tr>
 </thead>
 <tbody>
 {reviews.map(review => (
 <tr key={review.id} className="bg-white border-b hover:bg-slate-50">
 <td className="px-6 py-4 font-medium text-slate-900">{review.reviewerName}</td>
 <td className="px-6 py-4">{getTranslated(review.employerName, language)}</td>
 <td className="px-6 py-4"><StarRating rating={review.rating} size="sm" /></td>
 <td className="px-6 py-4 max-w-xs truncate">{getTranslated(review.comment, language)}</td>
 <td className="px-6 py-4">
 <button onClick={() => alert(`리뷰 ID ${review.id}를 삭제합니다.`)} className="text-red-500 hover:text-red-800"><i className="fa-solid fa-trash-can"></i></button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );

 const renderContent = () => {
 switch(activeTab) {
 case 'dashboard': return renderDashboard();
 case 'users': return renderUserManagement();
 case 'jobs': return renderJobManagement();
 case 'reviews': return renderReviewManagement();
 default: return null;
 }
 };

 return (
 <div className="animate-fade-in">
 <nav className="mb-6 bg-white rounded-lg border border-slate-200 p-2">
 <div className="flex space-x-2">
 <button className={getTabClass('dashboard')} onClick={() => setActiveTab('dashboard')}>대시보드</button>
 <button className={getTabClass('users')} onClick={() => setActiveTab('users')}>사용자 관리</button>
 <button className={getTabClass('jobs')} onClick={() => setActiveTab('jobs')}>공고 관리</button>
 <button className={getTabClass('reviews')} onClick={() => setActiveTab('reviews')}>리뷰 관리</button>
 </div>
 </nav>
 <div>{renderContent()}</div>
 </div>
 );
};

export default AdminPage;
