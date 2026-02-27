import React from 'react';
import { Shield, Plus } from 'lucide-react';

const Navbar = ({ onReportClick }) => (
  <nav className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50'>
    <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
      <div className='flex items-center gap-2.5 group cursor-pointer'>
        <div className='p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform'>
          <Shield className='text-white' size={18} strokeWidth={3} />
        </div>
        <span className='text-lg font-bold tracking-tight text-slate-900'>
          Avoid<span className='text-emerald-500'>Note</span>
        </span>
      </div>

      <div className='flex items-center gap-8'>
        <div className='hidden md:flex gap-6 text-[13px] font-semibold text-slate-500'>
          <a href='#scan' className='hover:text-slate-900 transition-colors'>
            Scanner
          </a>
          <a href='#reports' className='hover:text-slate-900 transition-colors'>
            Database
          </a>
        </div>
        <button
          onClick={onReportClick}
          className='bg-slate-950 text-white px-5 py-2 rounded-full text-[12px] font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-95'
        >
          Report Ad
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
