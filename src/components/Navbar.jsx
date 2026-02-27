import React from 'react';
import { Shield, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className='fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200/50'>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        <a href='#scan' className='flex items-center gap-2.5 group'>
          <div className='p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform'>
            <Shield className='text-white' size={18} strokeWidth={3} />
          </div>
          <span className='text-lg font-bold tracking-tight text-slate-900'>
            Avoid<span className='text-emerald-500'>Note</span>
          </span>
        </a>

        {/* FIXED: Added w-28 and removed appearance-none so it never shrinks */}
        <div className='flex items-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded-full border border-slate-200'>
          <Globe className='w-4 h-4 text-slate-500 shrink-0' />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer w-28'
          >
            <option value='en'>English</option>
            <option value='de'>Deutsch</option>
            <option value='el'>Ελληνικά</option>
            <option value='ja'>日本語</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
