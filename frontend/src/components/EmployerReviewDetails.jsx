import React, { useState } from 'react';
import { Employer, TranslatedString } from '../types';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';


const INITIAL_REVIEWS_TO_SHOW = 2;

const EmployerReviewDetails = ({ employer, onBack, onWriteReview, t, language, getTranslated }) => {
 const [showAllReviews, setShowAllReviews] = useState(false);

 const reviewsToShow = showAllReviews ? employer.reviews : employer.reviews.slice(0, INITIAL_REVIEWS_TO_SHOW);

 return (
 <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
 <button onClick={onBack} className="text-slate-600 hover:text-slate-900 mb-6 flex items-center text-sm font-semibold">
 <i className="fa-solid fa-arrow-left mr-2"></i> {t('backToReviewList')}
 </button>

 <div className="flex items-center mb-8 bg-slate-50/70 border border-slate-200 p-6 rounded-lg">
 <img src={employer.logo} alt={getTranslated(employer.name, language)} className="w-20 h-20 rounded-full mr-6 object-cover" />
 <div>
 <h2 className="text-3xl font-bold text-slate-800">{getTranslated(employer.name, language)}</h2>
 <p className="text-lg text-slate-600">{getTranslated(employer.industry, language)}</p>
 <div className="flex items-center mt-2">
 <StarRating rating={employer.averageRating} size="lg" />
 <span className="ml-3 text-xl font-bold text-slate-700">{employer.averageRating.toFixed(1)}</span>
 <span className="ml-1 text-md text-slate-500">/ 5.0 ({employer.totalReviews} {t('reviewsCount')})</span>
 </div>
 </div>
 </div>
 
 <div>
 <div className="flex justify-between items-center mb-1">
 <h3 className="text-2xl font-bold text-slate-800">{t('reviews')}</h3>
 <button 
 onClick={() => onWriteReview(employer)}
 className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition duration-300 flex items-center text-sm"
 >
 <i className="fa-solid fa-pen-to-square mr-2"></i> {t('writeNewPost')}
 </button>
 </div>
 <p className="text-xs text-slate-500 text-right mb-4">{t('review_lock_policy')}</p>
 <div className="space-y-4">
 {reviewsToShow.length > 0 ? (
 reviewsToShow.map(review => (
 <ReviewCard key={review.id} review={review} language={language} getTranslated={getTranslated} />
 ))
 ) : (
 <p className="text-slate-500 bg-slate-100 p-4 rounded-md">{t('noReviewsYet')}</p>
 )}
 </div>

 {employer.reviews.length > INITIAL_REVIEWS_TO_SHOW && (
 <div className="mt-6 text-center">
 <button
 onClick={() => setShowAllReviews(!showAllReviews)}
 className="text-slate-600 hover:text-slate-900 font-semibold"
 >
 {showAllReviews ? t('readLess') : t('readMore')}
 </button>
 </div>
 )}
 </div>
 </div>
 );
};

export default EmployerReviewDetails;