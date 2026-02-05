import React from 'react';
import { PhotoPost, TranslatedString } from '../types';


const CommunityPhotoGallery = ({ photos, language, getTranslated }) => {
 return (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
 {photos.map(photo => (
 <div key={photo.id} className="group relative overflow-hidden rounded-lg aspect-square">
 <img src={photo.imageUrl} alt={getTranslated(photo.caption, language)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
 <div className="absolute bottom-0 left-0 p-4 text-white">
 <p className="text-sm font-semibold">{getTranslated(photo.caption, language)}</p>
 <div className="flex items-center mt-1 text-xs opacity-80">
 <img src={photo.avatar} alt={photo.author} className="w-5 h-5 rounded-full mr-2 object-cover" />
 <span>{photo.author}</span>
 </div>
 </div>
 </div>
 ))}
 </div>
 );
};

export default CommunityPhotoGallery;
