
import React from 'react';
import { CommunityPost, TranslatedString } from '../types';


const CommunityPostDetails = ({ post, onBack, t, language, getTranslated }) => {
 return (
 <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
 <button onClick={onBack} className="mb-12 text-slate-400 font-bold hover:text-slate-900 transition-colors uppercase tracking-widest text-xs flex items-center gap-2">
 <i className="fa-solid fa-arrow-left"></i> BACK TO BOARD
 </button>

 <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
 <div className="p-12">
 <span className="bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-6 inline-block">
 {getTranslated(post.category, language)}
 </span>
 <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 leading-tight">
 {getTranslated(post.title, language)}
 </h1>
 <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-50">
 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 uppercase text-xs">
 {post.author.charAt(0)}
 </div>
 <div>
 <p className="font-bold text-slate-900">{post.author}</p>
 <p className="text-xs text-slate-400 font-bold">{post.date}</p>
 </div>
 </div>
 <div className="text-xl text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
 {getTranslated(post.content, language)}
 </div>
 </div>
 
 <div className="bg-slate-50 p-12">
 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Comments (0)</h3>
 <div className="text-center py-12 text-slate-300">
 <i className="fa-solid fa-comments text-4xl mb-4 opacity-20"></i>
 <p className="font-bold">No comments yet</p>
 </div>
 <div className="mt-8 flex gap-4">
 <input type="text" placeholder="Add a comment..." className="flex-1 bg-white border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-slate-900 shadow-sm" />
 <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Post</button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default CommunityPostDetails;
