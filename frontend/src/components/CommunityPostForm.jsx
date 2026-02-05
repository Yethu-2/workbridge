import React, { useState } from 'react';

const CommunityPostForm = ({ onCancel, onSubmit, t, language, getTranslated, direction }) => {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [categoryType, setCategoryType] = useState('general');
 
 const handleSubmit = (e) => {
 e.preventDefault();
 const category = categoryType === 'general' 
 ? { ko: '생활정보', en: 'Life Info', vi: 'Thông tin đời sống' }
 : { ko: 'Q&A', en: 'Q&A', vi: 'Hỏi & Đáp' };

 // For simplicity, create a simple translated string from the Korean input
 const translatedTitle = { ko: title, en: title, vi: title };
 const translatedContent = { ko: content, en: content, vi: content };
 
 onSubmit({ title: translatedTitle, content: translatedContent, category, categoryType });
 };

 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">{t('writeNewPost')}</h2>
 <form onSubmit={handleSubmit}>
 <div className="space-y-6">
 <div>
 <label className="block text-sm font-medium text-slate-700 mb-2">카테고리 선택</label>
 <div className="flex gap-4">
 <label className="flex items-center">
 <input type="radio" name="category" value="general" checked={categoryType === 'general'} onChange={() => setCategoryType('general')} className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300" />
 <span className="ml-2 text-slate-700">자유게시판</span>
 </label>
 <label className="flex items-center">
 <input type="radio" name="category" value="qna" checked={categoryType === 'qna'} onChange={() => setCategoryType('qna')} className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300" />
 <span className="ml-2 text-slate-700">Q&A / 법률</span>
 </label>
 </div>
 </div>
 <div>
 <label htmlFor="title" className="block text-sm font-medium text-slate-700">제목</label>
 <input
 type="text"
 id="title"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 required
 className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 />
 </div>
 <div>
 <label htmlFor="content" className="block text-sm font-medium text-slate-700">내용</label>
 <textarea
 id="content"
 rows={10}
 value={content}
 onChange={(e) => setContent(e.target.value)}
 required
 className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 ></textarea>
 </div>
 </div>
 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-3">
 <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
 {t('cancel')}
 </button>
 <button type="submit" className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t('submitPost')}
 </button>
 </div>
 </form>
 </div>
 );
};

export default CommunityPostForm;
