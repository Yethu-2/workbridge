import React from 'react';
import { MarketItem, TranslatedString } from '../types';


const CommunityMarketplace = ({ items, language, getTranslated }) => {
 return (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
 {items.map(item => (
 <div key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden group cursor-pointer">
 <div className="aspect-square overflow-hidden">
 <img src={item.imageUrl} alt={getTranslated(item.title, language)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
 </div>
 <div className="p-3">
 <h4 className="font-semibold text-slate-800 truncate">{getTranslated(item.title, language)}</h4>
 <p className="text-lg font-bold text-emerald-600 mt-1">{item.price}</p>
 <p className="text-xs text-slate-500 mt-1 truncate"><i className="fa-solid fa-location-dot mr-1"></i>{getTranslated(item.location, language)}</p>
 </div>
 </div>
 ))}
 </div>
 );
};

export default CommunityMarketplace;
