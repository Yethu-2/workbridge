import React from 'react';


const Testimonials = ({ t }) => {
 const testimonials = [
 {
 quoteKey: "testimonial_quote_1",
 name: "Nguyen Van A",
 roleKey: "testimonial_role_1",
 avatar: "https://picsum.photos/seed/testimonial1/100"
 },
 {
 quoteKey: "testimonial_quote_2",
 name: "김사장",
 roleKey: "testimonial_role_2",
 avatar: "https://picsum.photos/seed/boss/100"
 },
 {
 quoteKey: "testimonial_quote_3",
 name: "이민지",
 roleKey: "testimonial_role_3",
 avatar: "https://picsum.photos/seed/testimonial2/100"
 }
 ];

 return (
 <div className="bg-slate-50 py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t('home_testimonialsTitle')}</h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {testimonials.map((testimonial, index) => (
 <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
 <i className="fa-solid fa-quote-left text-2xl text-emerald-400 mb-4"></i>
 <p className="text-slate-600 flex-grow">"{t(testimonial.quoteKey)}"</p>
 <div className="mt-6 pt-6 border-t border-slate-100 flex items-center">
 <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
 <div>
 <p className="font-bold text-slate-800">{testimonial.name}</p>
 <p className="text-sm text-slate-500">{t(testimonial.roleKey)}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};

export default Testimonials;
