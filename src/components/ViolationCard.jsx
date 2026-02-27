import React from 'react';
import { AlertCircle, Clock, ArrowUpRight } from 'lucide-react';

const ViolationCard = ({ report, onClick }) => {
  const { domain, type, severity, time } = report;

  return (
    <div
      onClick={() => onClick(report)}
      className='bg-white p-6 rounded-[24px] border border-slate-200/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group'
    >
      <div className='flex justify-between items-start mb-6'>
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
          ${severity === 'critical' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}
        >
          {severity}
        </div>
        <ArrowUpRight
          size={18}
          className='text-slate-300 group-hover:text-emerald-500 transition-colors'
        />
      </div>

      <h3 className='text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors'>
        {domain}
      </h3>
      <div className='flex items-center gap-2 text-rose-500 mb-4 font-bold text-[12px]'>
        <AlertCircle size={14} /> {type}
      </div>

      <div className='flex items-center gap-2 pt-4 border-t border-slate-50 text-slate-400 text-[11px] font-medium'>
        <Clock size={12} /> {time}
      </div>
    </div>
  );
};

export default ViolationCard;
