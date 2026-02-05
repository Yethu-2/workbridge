import React, { useState } from 'react';
import Header from './components/Header';
import JobDetails from './components/JobDetails';
import MyPage from './components/MyPage';
import CommunityPage from './components/CommunityPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';
import WorkingHolidayPage from './components/WorkingHolidayPage';
import FindJobsPage from './components/FindJobsPage';
import TalentPoolPage from './components/TalentPoolPage';
import VisaPage from './components/VisaPage';

const MOCK_JOBS = [
  // Agriculture (WH)
  {
    id: 101,
    title: { ko: "제주 서귀포 스마트팜 감귤 수확", en: "Jeju Smart Farm Mandarin Harvest", vi: "Thu hoạch quýt trang trại Jeju" },
    type: { ko: "워킹홀리데이", en: "Working Holiday", vi: "Working Holiday" },
    salary: { amount: 2800000, currency: 'KRW', text: { ko: "월 280만원", en: "KRW 2.8M/mo", vi: "2.800.000 KRW/tháng" } },
    description: { ko: "아름다운 제주에서 최첨단 스마트팜 기술을 배우며 일하세요.", en: "Work in beautiful Jeju using smart farm tech.", vi: "Làm việc tại Jeju với công nghệ trang trại thông minh." },
    employer: { id: 1, name: { ko: "제주그린농장", en: "Jeju Green Farm", vi: "Trang trại Jeju Green" }, logo: "https://picsum.photos/seed/farm1/200", industry: { ko: "Agriculture", en: "Agriculture", vi: "Nông nghiệp" }, location: { ko: "제주", en: "Jeju", vi: "Jeju" }, averageRating: 4.8, totalReviews: 120 },
    industry: { ko: "Agriculture", en: "Agriculture", vi: "Nông nghiệp" },
    location: { ko: "제주", en: "Jeju", vi: "Jeju" },
    dueDate: '2024-12-31'
  },
  {
    id: 102,
    title: { ko: "평창 대관령 유기농 목장 관리", en: "Pyeongchang Organic Ranch Care", vi: "Quản lý trang trại hữu cơ Pyeongchang" },
    type: { ko: "워킹홀리데이", en: "Working Holiday", vi: "Working Holiday" },
    salary: { amount: 2650000, currency: 'KRW', text: { ko: "월 265만원", en: "KRW 2.65M/mo", vi: "2.650.000 KRW/tháng" } },
    description: { ko: "대관령의 맑은 공기 속에서 동물들과 함께하는 일자리입니다.", en: "Work with animals in fresh mountain air.", vi: "Làm việc với động vật trong không khí trong lành." },
    employer: { id: 2, name: { ko: "대관령목장", en: "Mountain Ranch", vi: "Trang trại Mountain" }, logo: "https://picsum.photos/seed/farm2/200", industry: { ko: "Agriculture", en: "Agriculture", vi: "Nông nghiệp" }, location: { ko: "평창", en: "Pyeongchang", vi: "Pyeongchang" }, averageRating: 4.5, totalReviews: 85 },
    industry: { ko: "Agriculture", en: "Agriculture", vi: "Nông nghiệp" },
    location: { ko: "강원도 평창", en: "Pyeongchang", vi: "Pyeongchang" },
    dueDate: '2024-11-15'
  },
  // Tech WH
  {
    id: 201,
    title: { ko: "강남 IT 스타트업 주니어 프론트엔드 인턴", en: "Gangnam IT Startup Frontend Intern", vi: "Thực tập sinh Frontend Startup IT Gangnam" },
    type: { ko: "워킹홀리데이", en: "Working Holiday", vi: "Working Holiday" },
    salary: { amount: 3200000, currency: 'KRW', text: { ko: "월 320만원", en: "KRW 3.2M/mo", vi: "3.200.000 KRW/tháng" } },
    description: { ko: "H-1 비자 소지자를 위한 테크 인턴십 프로그램입니다.", en: "Tech internship for H-1 visa holders.", vi: "Chương trình thực tập công nghệ cho visa H-1." },
    employer: { id: 3, name: { ko: "테크웨이브", en: "TechWave", vi: "TechWave" }, logo: "https://picsum.photos/seed/tech1/200", industry: { ko: "Tech", en: "Tech", vi: "Công nghệ" }, location: { ko: "서울 강남", en: "Gangnam", vi: "Gangnam" }, averageRating: 4.9, totalReviews: 30 },
    industry: { ko: "Tech", en: "Tech", vi: "Công nghệ" },
    location: { ko: "서울 강남", en: "Gangnam", vi: "Gangnam" },
    dueDate: '2024-12-20'
  },
  // Service
  {
    id: 301,
    title: { ko: "명동 5성급 호텔 게스트 서비스", en: "Myeongdong 5-star Hotel Guest Service", vi: "Dịch vụ khách hàng khách sạn 5 sao Myeongdong" },
    type: { ko: "워킹홀리데이", en: "Working Holiday", vi: "Working Holiday" },
    salary: { amount: 2900000, currency: 'KRW', text: { ko: "월 290만원", en: "KRW 2.9M/mo", vi: "2.900.000 KRW/tháng" } },
    description: { ko: "글로벌 관광객을 응대하며 커리어를 쌓으세요.", en: "Build your career serving global guests.", vi: "Xây dựng sự nghiệp phục vụ khách quốc tế." },
    employer: { id: 4, name: { ko: "로얄 호텔", en: "Royal Hotel", vi: "Khách sạn Royal" }, logo: "https://picsum.photos/seed/hotel1/200", industry: { ko: "Service", en: "Service", vi: "Dịch vụ" }, location: { ko: "서울 명동", en: "Myeongdong", vi: "Myeongdong" }, averageRating: 4.7, totalReviews: 150 },
    industry: { ko: "Service", en: "Service", vi: "Dịch vụ" },
    location: { ko: "서울 명동", en: "Myeongdong", vi: "Myeongdong" },
    dueDate: '2024-12-10'
  },
  // Culture
  {
    id: 401,
    title: { ko: "용인 한국민속촌 외국인 가이드", en: "Korean Folk Village Foreign Guide", vi: "Hướng dẫn viên quốc tế Làng dân gian Hàn Quốc" },
    type: { ko: "워킹홀리데이", en: "Working Holiday", vi: "Working Holiday" },
    salary: { amount: 2750000, currency: 'KRW', text: { ko: "월 275만원", en: "KRW 2.75M/mo", vi: "2.750.000 KRW/tháng" } },
    description: { ko: "한국 문화를 알리며 특별한 경험을 하세요.", en: "Promote Korean culture and gain experience.", vi: "Quảng bá văn hóa Hàn Quốc và nhận kinh nghiệm." },
    employer: { id: 5, name: { ko: "민속촌", en: "Folk Village", vi: "Làng dân gian" }, logo: "https://picsum.photos/seed/culture1/200", industry: { ko: "Culture", en: "Culture", vi: "Văn hóa" }, location: { ko: "경기 용인", en: "Yongin", vi: "Yongin" }, averageRating: 4.6, totalReviews: 42 },
    industry: { ko: "Culture", en: "Culture", vi: "Văn hóa" },
    location: { ko: "경기도 용인", en: "Yongin", vi: "Yongin" },
    dueDate: '2024-11-30'
  }
];

const translations = {
  ko: {
    findJobs: 'KONEXA 채용', talentPool: '인재풀', workingHoliday: '워킹홀리데이', community: '커뮤니티', myPage: '마이페이지',
    home_heroTitle: "글로벌 인재, 한국의 기회가 되다.", home_heroSubtitle: "세계를 잇는 프리미엄 커리어 브릿지, KONEXA.", home_cta_explore: '엘리트 공고 탐색', diagnosis_title: 'AI 비자 진단 리포트',
    login: '로그인', logout: '로그아웃', viewProfile: '상세보기', backToList: '뒤로가기'
  },
  en: {
    findJobs: 'KONEXA Jobs', talentPool: 'Talent Pool', workingHoliday: 'Working Holiday', community: 'Community', myPage: 'My Page',
    home_heroTitle: "Global Talent, Korea's Opportunity.", home_heroSubtitle: "Premium career bridge, KONEXA.", home_cta_explore: 'Explore Jobs', diagnosis_title: 'AI Visa Diagnosis',
    login: 'Login', logout: 'Logout', viewProfile: 'Details', backToList: 'Back'
  },
  vi: {
    findJobs: 'Việc làm KONEXA', talentPool: 'Nhân tài', workingHoliday: 'Working Holiday', community: 'Cộng đồng', myPage: 'Cá nhân',
    home_heroTitle: "Nhân tài quốc tế, Cơ hội tại Hàn Quốc.", home_heroSubtitle: "Kết nối tinh hoa, KONEXA.", home_cta_explore: 'Khám phá việc làm', diagnosis_title: 'Chẩn đoán Visa AI',
    login: 'Đăng nhập', logout: 'Đăng xuất', viewProfile: 'Chi tiết', backToList: 'Quay lại'
  }
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [language, setLanguage] = useState('ko');
  const [whCategory, setWhCategory] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const t = (key) => translations[language][key] || key;
  const getTranslated = (textObject, lang) => textObject ? (textObject[lang] || textObject['ko']) : '';

  const navigate = (view, params = {}) => {
    if (params?.job) setSelectedJob(params.job);
    if (params?.whCategory) setWhCategory(params.whCategory); else if (view !== 'workingHoliday') setWhCategory(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomePage onFindJobsClick={() => navigate('jobs')} onVisaDiagnosisClick={() => navigate('visa')} featuredJobs={MOCK_JOBS.slice(0, 3)} t={t} language={language} getTranslated={getTranslated} onSelectJob={(job) => navigate('jobDetails', { job })} onToggleBookmark={() => {}} />;
      case 'jobs': return <FindJobsPage jobs={MOCK_JOBS} onSelectJob={(job) => navigate('jobDetails', { job })} onToggleBookmark={() => {}} t={t} language={language} getTranslated={getTranslated} platformDirection="vn-to-kr" uniqueLocations={[]} uniqueIndustries={[]} uniqueJobTypes={[]} skills={[]} filters={{}} onSearch={()=>{}} />;
      case 'workingHoliday': return <WorkingHolidayPage t={t} jobs={MOCK_JOBS} selectedCategory={whCategory} onCategorySelect={setWhCategory} onSelectJob={(job) => navigate('jobDetails', { job })} language={language} getTranslated={getTranslated} />;
      case 'community': return <CommunityPage posts={[]} photos={[]} marketItems={[]} activeTab="posts" onTabChange={()=>{}} onSelectPost={() => {}} onNewPost={() => {}} t={t} language={language} getTranslated={getTranslated} direction="vn-to-kr" />;
      case 'talentPool': return <TalentPoolPage applicants={[]} skills={[]} t={t} language={language} getTranslated={getTranslated} viewerRole={currentUser?.role || null} onSelectApplicant={() => {}} />;
      case 'jobDetails': return selectedJob ? <JobDetails job={selectedJob} onBack={() => window.history.back()} onApply={() => {}} t={t} language={language} getTranslated={getTranslated} /> : null;
      case 'visa': return <VisaPage direction="vn-to-kr" onApply={() => navigate('jobs')} t={t} visaType="e7" onVisaTypeChange={() => {}} />;
      case 'mypage': return currentUser ? <MyPage user={currentUser} onUpdateUser={setCurrentUser} t={t} language={language} getTranslated={getTranslated} /> : null;
      default: return <HomePage onFindJobsClick={() => navigate('jobs')} onVisaDiagnosisClick={() => navigate('visa')} featuredJobs={MOCK_JOBS.slice(0, 3)} t={t} language={language} getTranslated={getTranslated} onSelectJob={(job) => navigate('jobDetails', { job })} onToggleBookmark={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onHomeClick={() => navigate('home')}
        onFindJobsClick={() => navigate('jobs')}
        onVolunteerClick={(params) => navigate('workingHoliday', params)}
        onTalentPoolClick={() => navigate('talentPool')}
        onMyPageClick={() => navigate('mypage')}
        onCommunityClick={() => navigate('community')}
        onCommunityTabNavigate={() => {}}
        onVisaClick={() => navigate('visa')}
        onForEmployersClick={() => navigate('jobs')}
        onMentorsClick={() => navigate('jobs')}
        onAdminClick={() => navigate('home')}
        onLogout={() => setCurrentUser(null)}
        onLogin={() => setIsLoginModalOpen(true)}
        isLoggedIn={!!currentUser}
        userRole={currentUser?.role || null}
        language={language}
        onLanguageChange={setLanguage}
        direction="vn-to-kr"
        onDirectionChange={() => {}}
        t={t}
        getTranslated={getTranslated}
      />
      <main className="min-h-screen">
        {renderContent()}
      </main>
      {isLoginModalOpen && (
        <LoginPage onClose={() => setIsLoginModalOpen(false)} onLogin={(role) => { 
          setCurrentUser({ 
            id: 1, 
            name: "Hwang Min-kyu", 
            nationality: { ko: "한국", en: "KR", vi: "KR" }, 
            avatar: "https://picsum.photos/seed/user/200", 
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            role,
            university: "KONEXA University",
            selfIntroduction: "Hello! I am a passionate developer seeking a global career.",
            aiVerification: { devScore: 92, englishFluency: 88, koreanFluency: 95, culturalAdaptability: 90, ocrVerified: true },
            visaDiagnosis: { probability: 89, eligibleType: "E-7-1" },
            wpReady: { koreanLevel: 5, trainingCompletion: 100, behavioralScore: 94 }
          }); 
          setIsLoginModalOpen(false); 
          navigate('mypage'); 
        }} t={t} />
      )}
      <Chatbot t={t} />
    </div>
  );
};

export default App;
