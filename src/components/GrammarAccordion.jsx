import React, { useState } from 'react';

const GrammarAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm transition-all">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 flex justify-between items-center transition-colors">
        <span className="text-lg">{title}</span>
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-45 text-red-500' : 'text-blue-500'}`}>+</span>
      </button>
      {isOpen && <div className="p-5 text-slate-600 leading-relaxed border-t-2 border-slate-100 bg-white animate-in fade-in slide-in-from-top-2">{children}</div>}
    </div>
  );
};

export default GrammarAccordion;
