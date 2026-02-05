import React from 'react';



const KRW_TO_VND_RATE = 19.5; // Example fixed rate

const PaymentModal = ({ details, onClose, language }) => {
 const { amount, description, onSuccess } = details;

 const amountInVND = (amount * KRW_TO_VND_RATE).toLocaleString('vi-VN');

 const text = {
 ko: {
 title: '결제 진행',
 item: '항목',
 amount: '금액',
 paymentMethod: '결제 수단 선택',
 creditCard: '신용카드',
 bankTransfer: '계좌 이체',
 pay: '결제하기',
 cancel: '취소',
 },
 en: {
 title: 'Payment',
 item: 'Item',
 amount: 'Amount',
 paymentMethod: 'Select Payment Method',
 creditCard: 'Credit Card',
 bankTransfer: 'Bank Transfer',
 pay: 'Pay Now',
 cancel: 'Cancel',
 },
 vi: {
 title: 'Thanh toán',
 item: 'Mục',
 amount: 'Số tiền',
 paymentMethod: 'Chọn phương thức thanh toán',
 creditCard: 'Thẻ tín dụng',
 bankTransfer: 'Chuyển khoản ngân hàng',
 pay: 'Thanh toán ngay',
 cancel: 'Hủy',
 },
 };

 const t = text[language];

 return (
 <div className="bg-gray-900 bg-opacity-60 fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
 <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fade-in max-w-md mx-auto w-full">
 <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">{t.title}</h2>
 
 <div className="bg-slate-50/70 border border-slate-200 p-4 rounded-lg space-y-3">
 <div>
 <p className="text-sm font-medium text-slate-500">{t.item}</p>
 <p className="text-lg font-semibold text-slate-800">{description}</p>
 </div>
 <div>
 <p className="text-sm font-medium text-slate-500">{t.amount}</p>
 <p className="text-2xl font-bold text-slate-800">
 {amount.toLocaleString('ko-KR')} KRW
 </p>
 <p className="text-sm text-slate-500">
 (≈ {amountInVND} VND)
 </p>
 </div>
 </div>

 <div className="mt-6">
 <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.paymentMethod}</h3>
 <div className="space-y-2">
 <button className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
 <i className="fa-solid fa-credit-card mr-3 text-slate-500"></i>
 {t.creditCard}
 </button>
 <button className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
 <i className="fa-solid fa-building-columns mr-3 text-slate-500"></i>
 {t.bankTransfer}
 </button>
 </div>
 </div>

 <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-3">
 <button onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition duration-300">
 {t.cancel}
 </button>
 <button onClick={onSuccess} className="bg-slate-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition duration-300">
 {t.pay}
 </button>
 </div>
 </div>
 </div>
 );
};

export default PaymentModal;