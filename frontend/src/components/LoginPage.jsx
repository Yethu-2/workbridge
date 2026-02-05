import React, { useState } from 'react';

const LoginPage = ({ onClose, onLogin, onRegister, t }) => {
 const [activeTab, setActiveTab] = useState('job_seeker');
 const [isSignup, setIsSignup] = useState(false);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');

 const getTabClass = (tabName) => {
 return `w-1/3 py-3 text-sm font-bold text-center transition-colors duration-200 ease-in-out border-b-2 ${
 activeTab === tabName
 ? 'border-slate-800 text-slate-800'
 : 'border-transparent text-slate-500 hover:text-slate-700'
 }`;
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setIsSubmitting(true);
 setErrorMessage('');

 try {
 if (isSignup) {
	 if (!name || name.trim().length < 2) {
		 setErrorMessage(t('nameRequired') || 'Name is required');
		 setIsSubmitting(false);
		 return;
	 }
	 await onRegister?.({ email, password, name, role: activeTab });
 } else {
	 await onLogin({ email, password, role: activeTab });
 }
 } catch (error) {
 setErrorMessage(error.message || (isSignup ? 'Sign up failed' : 'Login failed'));
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
 <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
 <div className="relative p-8">
 <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
 <i className="fas fa-times fa-lg"></i>
 </button>
 <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">{t('loginToYourAccount')}</h2>
 
 <div className="flex border-b border-slate-200 mb-6">
 <button className={getTabClass('job_seeker')} onClick={() => setActiveTab('job_seeker')}>{t('jobSeeker')}</button>
 <button className={getTabClass('employer')} onClick={() => setActiveTab('employer')}>{t('employer')}</button>
 <button className={getTabClass('admin')} onClick={() => setActiveTab('admin')}>{t('admin')}</button>
 </div>

 <form onSubmit={handleSubmit} className="space-y-4">
 {isSignup && (
 <div>
 <label htmlFor="name" className="text-sm font-medium text-slate-700">{t('name') || 'Name'}</label>
 <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 )}
 <div>
 <label htmlFor="email" className="text-sm font-medium text-slate-700">{t('emailOrId')}</label>
 <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 <div>
 <div className="flex justify-between items-baseline">
 <label htmlFor="password" className="text-sm font-medium text-slate-700">{t('password')}</label>
 <a href="#" className="text-xs text-slate-500 hover:text-slate-800">{t('forgotPassword')}</a>
 </div>
 <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500" />
 </div>
 {errorMessage && (
 <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
 )}
 <button type="submit" disabled={isSubmitting} className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors duration-300 disabled:opacity-60">
 {isSubmitting ? (t('loading') || 'Loading...') : (isSignup ? (t('signUp') || 'Sign up') : t('login'))}
 </button>
 </form>
 
 <div className="relative my-6">
 <div className="absolute inset-0 flex items-center" aria-hidden="true">
 <div className="w-full border-t border-slate-300" />
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-2 bg-white text-slate-500">{t('continueWith')}</span>
 </div>
 </div>

 <div className="flex space-x-3">
 <button className="w-full flex items-center justify-center py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><i className="fab fa-google text-red-500 mr-2"></i> Google</button>
 <button className="w-full flex items-center justify-center py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"><i className="fab fa-facebook text-blue-600 mr-2"></i> Facebook</button>
 </div>

 <p className="text-center text-sm text-slate-600 mt-6">
 {isSignup ? (t('alreadyHaveAccount') || 'Already have an account?') : t('dontHaveAccount')}
 <a
	 href="#"
	 onClick={(e) => {
		 e.preventDefault();
		 setIsSignup((prev) => !prev);
		 setErrorMessage('');
	 }}
	 className="font-bold text-slate-800 hover:underline ml-1"
 >
	 {isSignup ? (t('login') || 'Login') : t('signUp')}
 </a>
 </p>

 </div>
 </div>
 </div>
 );
};

export default LoginPage;