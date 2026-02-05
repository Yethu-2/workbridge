import React, { useState } from 'react';
import { Employer } from '../types';
import StarRating from './StarRating';


const ReviewFormModal = ({ employer, onClose, onSubmit, t }) => {
 const [rating, setRating] = useState(0);
 const [comment, setComment] = useState('');

 const handleSubmit = (e) => {
 e.preventDefault();
 if (rating > 0 && comment) {
 onSubmit(rating, comment);
 } else {
 alert('별점과 리뷰 내용을 모두 입력해주세요.');
 }
 };

 return (
 <div className="bg-black bg-opacity-60 fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
 <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fade-in max-w-lg mx-auto w-full m-4">
 <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
 <h2 className="text-2xl font-bold text-slate-800">{t('review_modal_title')}</h2>
 <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
 <i className="fa-solid fa-xmark text-2xl"></i>
 </button>
 </div>

 <form onSubmit={handleSubmit}>
 <div className="space-y-6">
 <div>
 <label className="block text-sm font-semibold text-slate-700 mb-2">{t('review_modal_rating')}</label>
 <div className="flex justify-center p-2 bg-slate-100 rounded-lg">
 <StarRating rating={rating} onRate={setRating} size="lg" />
 </div>
 </div>
 <div>
 <label htmlFor="comment" className="block text-sm font-semibold text-slate-700 mb-2">{t('review_modal_comment')}</label>
 <textarea
 id="comment"
 rows={5}
 value={comment}
 onChange={(e) => setComment(e.target.value)}
 required
 className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
 placeholder={`${employer.name.ko}에서의 근무 경험을 공유해주세요.`}
 ></textarea>
 </div>
 <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-md border border-slate-200 flex items-start">
 <i className="fa-solid fa-shield-halved text-slate-400 mr-2 mt-0.5"></i>
 <span>{t('review_modal_ai_filter')}</span>
 </div>
 </div>

 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-3">
 <button type="button" onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
 {t('cancel')}
 </button>
 <button type="submit" className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t('submitReview')}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
};

export default ReviewFormModal;