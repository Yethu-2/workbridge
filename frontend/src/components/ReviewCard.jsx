import React from 'react';
import { Review, TranslatedString } from '../types';
import StarRating from './StarRating';


const ReviewCard = ({ review, language, getTranslated }) => {
 return (
 <div className="bg-white p-6 rounded-lg border border-slate-200/80 mb-4">
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-4 flex-shrink-0">
 <span className="text-xl font-bold text-slate-600">{review.reviewerName.charAt(0)}</span>
 </div>
 <div className="flex-1">
 <div className="flex justify-between items-start">
 <div>
 <p className="font-bold text-slate-800">{review.reviewerName}</p>
 <p className="text-sm text-slate-500">{getTranslated(review.reviewerNationality, language)} &middot; {getTranslated(review.workDuration, language)}</p>
 </div>
 <div className="text-right flex-shrink-0 ml-4">
 <StarRating rating={review.rating} />
 <p className="text-xs text-slate-400 mt-1">{review.date}</p>
 </div>
 </div>
 <p className="mt-4 text-slate-700 leading-relaxed text-base">{getTranslated(review.comment, language)}</p>
 <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-md border border-slate-200/80">
 리뷰어 평균 점수 (Reviewer's average score): 
 <span className="font-semibold text-slate-700 ml-2">{review.reviewerAverageRating.toFixed(1)} / 5.0</span>
 </div>
 </div>
 </div>
 </div>
 );
};

export default ReviewCard;