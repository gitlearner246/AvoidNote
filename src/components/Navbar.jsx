import React from 'react';
import { Shield } from 'lucide-react';

const Navbar = () => (
  <nav className='fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200/50'>
    <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
      <a href='#scan' className='flex items-center gap-2.5 group'>
        <div className='p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20'>
          <Shield className='text-white' size={18} strokeWidth={3} />
        </div>
        <span className='text-lg font-bold tracking-tight text-slate-900'>
          Avoid<span className='text-emerald-500'>Note</span>
        </span>
      </a>
    </div>
  </nav>
);

export default Navbar;
