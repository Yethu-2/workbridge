import React, { useState, useRef, useEffect } from 'react';
import ExpertConnect from './ExpertConnect';
import CommunityPhotoGallery from './CommunityPhotoGallery';
import CommunityMarketplace from './CommunityMarketplace';

const MOCK_LOCATIONS = [
 { ko: '서울', en: 'Seoul', vi: 'Seoul' },
 { ko: '부산', en: 'Busan', vi: 'Busan' },
 { ko: '제주도', en: 'Jeju Island', vi: 'Đảo Jeju' },
 { ko: '호치민', en: 'Ho Chi Minh', vi: 'Hồ Chí Minh' },
 { ko: '하노이', en: 'Hanoi', vi: 'Hà Nội' },
 { ko: '다낭', en: 'Da Nang', vi: 'Đà Nẵng' },
 { ko: '인천광역시', en: 'Incheon', vi: 'Incheon' },
 { ko: '경기도', en: 'Gyeonggi-do', vi: 'Gyeonggi-do' },
];

const CommunityPage = ({ posts, photos, marketItems, activeTab, onTabChange, onSelectPost, onNewPost, t, language, getTranslated, direction }) => {
 const [activeSubTab, setActiveSubTab] = useState('general');
 const [locationFilter, setLocationFilter] = useState('all');
 const [isLocationFilterHovered, setIsLocationFilterHovered] = useState(false);
 const [isLocationFilterPinned, setIsLocationFilterPinned] = useState(false);

 const getTabClass = (tabName) => {
 return `px-5 py-3 text-sm font-bold rounded-lg transition-colors duration-200 ${
 activeTab === tabName 
 ? 'bg-white text-slate-800 shadow-sm' 
 : 'text-slate-600 hover:bg-white/60'
 }`;
 }

 const getSubTabClass = (tabName) => {
 return `px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
 activeSubTab === tabName 
 ? 'bg-slate-800 text-white' 
 : 'text-slate-600 hover:bg-slate-200/70'
 }`;
 }
 
 const filteredPosts = posts.filter(p => p.direction === direction && p.categoryType === activeSubTab);
 const filteredPhotos = photos.filter(p => locationFilter === 'all' || (p.location && getTranslated(p.location, 'ko') === locationFilter));
 const filteredMarketItems = marketItems.filter(p => locationFilter === 'all' || (p.location && getTranslated(p.location, 'ko') === locationFilter));

 const Sidebar = () => (
 <div className="lg:col-span-1 space-y-6">
 <div className="bg-white p-4 rounded-lg border border-slate-200">
 <h3 className="font-bold text-slate-800 mb-3 flex items-center">
 <i className="fa-solid fa-bullhorn text-slate-500 mr-2"></i> {t('announcement')}
 </h3>
 <p className="text-sm text-slate-600">플랫폼 운영 정책이 2024년 8월 1일부로 개정됩니다. <a href="#" className="font-semibold text-emerald-600 hover:underline">자세히 보기</a></p>
 </div>
 
 {(activeTab === 'photos' || activeTab === 'market') && (
 <div className="bg-white p-4 rounded-lg border border-slate-200 sticky top-24">
 <h3 className="font-bold text-slate-800 mb-3 flex items-center">
 <i className="fa-solid fa-filter text-slate-500 mr-2"></i> 필터
 </h3>
 <div 
 className="relative"
 onMouseEnter={() => setIsLocationFilterHovered(true)}
 onMouseLeave={() => setIsLocationFilterHovered(false)}
 >
 <button className="w-full text-left flex justify-between items-center p-2 rounded-md hover:bg-slate-100">
 <span className="text-sm font-semibold">{t('location')}</span>
 <div className="flex items-center">
 <span className="text-xs text-slate-500 mr-2">{locationFilter === 'all' ? t('allLocations') : locationFilter}</span>
 <i className="fa-solid fa-chevron-down text-xs text-slate-400"></i>
 </div>
 </button>
 {(isLocationFilterHovered || isLocationFilterPinned) && (
 <div className="absolute z-10 top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 p-2">
 <div className="flex justify-end mb-1">
 <button onClick={() => setIsLocationFilterPinned(!isLocationFilterPinned)} className={`p-1 w-6 h-6 rounded-md flex items-center justify-center ${isLocationFilterPinned ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
 <i className="fa-solid fa-thumbtack text-xs"></i>
 </button>
 </div>
 <ul className="max-h-48 overflow-y-auto">
 <li 
 onClick={() => setLocationFilter('all')} 
 className="px-2 py-1.5 text-sm hover:bg-slate-100 rounded-md cursor-pointer"
 >{t('allLocations')}</li>
 {MOCK_LOCATIONS.map(loc => (
 <li 
 key={getTranslated(loc, 'ko')}
 onClick={() => setLocationFilter(getTranslated(loc, 'ko'))}
 className="px-2 py-1.5 text-sm hover:bg-slate-100 rounded-md cursor-pointer"
 >{getTranslated(loc, language)}</li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 );

 const MainContent = () => {
 switch(activeTab) {
 case 'posts': return <PostsContent />;
 case 'photos': return <CommunityPhotoGallery photos={filteredPhotos} language={language} getTranslated={getTranslated} />;
 case 'market': return <CommunityMarketplace items={filteredMarketItems} language={language} getTranslated={getTranslated} />;
 default: return null;
 }
 }
 
 const PostsContent = () => (
 <div>
 <div className="flex justify-between items-center mb-6">
 <nav className="p-1 bg-slate-100/80 rounded-lg flex flex-wrap gap-1">
 <button className={getSubTabClass('general')} onClick={() => setActiveSubTab('general')}>자유게시판</button>
 <button className={getSubTabClass('qna')} onClick={() => setActiveSubTab('qna')}>Q&A / 법률</button>
 </nav>
 <button onClick={onNewPost} className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex items-center">
 <i className="fa-solid fa-pen-to-square mr-2"></i> {t('writeNewPost')}
 </button>
 </div>

 <div className="bg-white rounded-xl shadow-sm border border-slate-200">
 <ul className="divide-y divide-slate-200">
 {filteredPosts.length > 0 ? filteredPosts.map(post => (
 <li key={post.id} onClick={() => onSelectPost(post)} className="p-5 hover:bg-slate-50/70 cursor-pointer transition-colors group">
 <div className="flex justify-between items-center mb-1">
 <p className="text-sm font-semibold text-emerald-600">{getTranslated(post.category, language)}</p>
 <p className="text-xs text-slate-500">{post.date}</p>
 </div>
 <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{getTranslated(post.title, language)}</h3>
 <p className="text-sm text-slate-600 mt-1 truncate">{getTranslated(post.content, language)}</p>
 <div className="flex items-center text-xs text-slate-500 mt-3">
 <span>{t('author')}: {post.author}</span>
 <span className="mx-2">&middot;</span>
 <span>{t('comments')} {post.comments.length}</span>
 </div>
 </li>
 )) : (
 <p className="p-6 text-center text-slate-500">
 {activeSubTab === 'general' ? '아직 게시글이 없습니다.' : '아직 질문이 없습니다.'}
 </p>
 )}
 </ul>
 </div>

 {activeSubTab === 'qna' && (
 <div className="mt-10">
 <h3 className="text-2xl font-bold text-slate-800 mb-4">{t('legalGuide_title')}</h3>
 <p className="text-slate-600 mb-6">{t('legalGuide_subtitle')}</p>
 <ExpertConnect t={t} />
 </div>
 )}
 </div>
 );

 return (
 <div className="animate-fade-in max-w-7xl mx-auto">
 <div className="text-center mb-8">
 <h2 className="text-4xl font-bold text-slate-800">{t('community')}</h2>
 <p className="text-slate-600 mt-2">{t('communitySubtitle')}</p>
 </div>

 <div className="mb-8 flex justify-center">
 <nav className="p-1.5 bg-slate-100/80 rounded-lg flex flex-wrap gap-1.5">
 <button className={getTabClass('posts')} onClick={() => onTabChange('posts')}>{t('community_tab_posts')}</button>
 <button className={getTabClass('photos')} onClick={() => onTabChange('photos')}>{t('community_tab_photos')}</button>
 <button className={getTabClass('market')} onClick={() => onTabChange('market')}>{t('community_tab_market')}</button>
 </nav>
 </div>
 
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
 <Sidebar />
 <div className="lg:col-span-3">
 <MainContent />
 </div>
 </div>
 </div>
 );
};

export default CommunityPage;