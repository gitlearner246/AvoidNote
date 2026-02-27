import React from 'react';
import { ShieldAlert, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // The "magic" function

const ViolationCard = ({ report, onClick }) => {
  // Convert the DB string into a "3 mins ago" style text
  // We add { addSuffix: true } to get "ago" at the end
  const timeAgo = report.createdAt
    ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
    : 'Recently';

  const severityColors = {
    critical: 'bg-red-50 text-red-600 border-red-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    safe: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };

  return (
    <div
      onClick={() => onClick(report)}
      className='group bg-white border border-slate-100 p-8 rounded-[32px] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all cursor-pointer active:scale-[0.98]'
    >
      <div className='flex justify-between items-start mb-6'>
        <div
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${severityColors[report.severity]}`}
        >
          {report.severity}
        </div>
        <div className='flex items-center text-slate-400 text-sm font-medium'>
          <Clock className='w-4 h-4 mr-1.5' />
          {timeAgo} {/* Now displays as "2 minutes ago" */}
        </div>
      </div>

      <h3 className='text-2xl font-black text-slate-900 mb-2 truncate group-hover:text-emerald-600 transition-colors'>
        {report.domain}
      </h3>
      <p className='text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed'>
        {report.description}
      </p>

      <div className='flex items-center text-slate-900 font-bold text-sm'>
        View Evidence
        <ChevronRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform' />
      </div>
    </div>
  );
};

export default ViolationCard;
