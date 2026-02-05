
import React from 'react';


const StarRating = ({ rating, size = 'md', onRate, className }) => {
 const fullStars = Math.floor(rating);
 const halfStar = rating % 1 !== 0;
 const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
 
 const starSizeClasses = {
 sm: 'h-4 w-4',
 md: 'h-5 w-5',
 lg: 'h-6 w-6',
 };

 const isInteractive = onRate !== undefined;

 if (isInteractive) {
 return (
 <div className={`flex items-center text-slate-300 ${className}`}>
 {[...Array(5)].map((_, i) => (
 <i 
 key={`interactive-${i}`} 
 className={`fa-solid fa-star ${starSizeClasses[size]} ${i < rating ? 'text-yellow-400' : 'hover:text-yellow-300'} cursor-pointer transition-colors`}
 onClick={() => onRate(i + 1)}
 ></i>
 ))}
 </div>
 );
 }

 return (
 <div className={`flex items-center text-yellow-400 ${className}`}>
 {[...Array(fullStars)].map((_, i) => (
 <i key={`full-${i}`} className={`fa-solid fa-star ${starSizeClasses[size]}`}></i>
 ))}
 {halfStar && <i className={`fa-solid fa-star-half-stroke ${starSizeClasses[size]}`}></i>}
 {[...Array(emptyStars)].map((_, i) => (
 <i key={`empty-${i}`} className={`fa-regular fa-star text-slate-300 ${starSizeClasses[size]}`}></i>
 ))}
 </div>
 );
};


export default StarRating;