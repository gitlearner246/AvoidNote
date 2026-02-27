import React from 'react';
import { Trophy, ShieldCheck, AlertTriangle } from 'lucide-react';

const Leaderboard = ({ reports }) => {
  // Logic: Sort by verifications and take the top 5
  const topOffenders = [...reports]
    .filter((r) => (r.verifications || 0) > 0)
    .sort((a, b) => (b.verifications || 0) - (a.verifications || 0))
    .slice(0, 5);

  return (
    <div className='mt-12 bg-slate-900 text-white rounded-[32px] p-8 shadow-2xl shadow-emerald-500/10'>
      <div className='flex items-center mb-8'>
        <div className='bg-emerald-500 p-2 rounded-xl mr-3'>
          <Trophy className='w-5 h-5 text-white' />
        </div>
        <h3 className='font-black tracking-tight text-xl'>The Hall of Shame</h3>
      </div>

      <div className='space-y-6'>
        {topOffenders.length > 0 ? (
          topOffenders.map((report, index) => (
            <div key={report.id} className='flex items-center group'>
              {/* Rank Number */}
              <span className='text-3xl font-black text-slate-700 mr-4 group-hover:text-emerald-500 transition-colors'>
                {index + 1}
              </span>

              <div className='flex-1 min-w-0'>
                <p className='font-bold truncate text-slate-100 group-hover:text-emerald-400 transition-colors'>
                  {report.domain}
                </p>
                <div className='flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest mt-1'>
                  <ShieldCheck className='w-3 h-3 mr-1 text-emerald-500' />
                  {report.verifications} Verifications
                </div>
              </div>

              {report.severity === 'critical' && (
                <AlertTriangle className='w-4 h-4 text-red-500 ml-2' />
              )}
            </div>
          ))
        ) : (
          <p className='text-sm font-medium text-slate-500 italic'>
            No verified threats yet. The charts are empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
