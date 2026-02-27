import React from 'react';
import {
  Flame,
  ArrowUpRight,
  Trophy,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

const TrendingSidebar = ({ reports = [] }) => {
  // 1. Trending Logic: Safely count occurrences (checks for type OR category)
  const counts = reports.reduce((acc, report) => {
    // If your database uses 'category' instead of 'type', this catches it.
    const threatType = report.type || report.category;

    // If there is no type at all, skip it so we don't render "undefined"
    if (!threatType) return acc;

    acc[threatType] = (acc[threatType] || 0) + 1;
    return acc;
  }, {});

  const trending = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // 2. Leaderboard Logic: Sort by community verifications
  const topOffenders = [...reports]
    .filter((r) => (r.verifications || 0) > 0)
    .sort((a, b) => (b.verifications || 0) - (a.verifications || 0))
    .slice(0, 5);

  return (
    <aside className='hidden lg:block w-80 shrink-0'>
      <div className='space-y-6'>
        {/* --- SECTION 1: HALL OF SHAME (LEADERBOARD) --- */}
        <div className='bg-slate-900 text-white rounded-[32px] p-8 shadow-2xl shadow-emerald-500/10 border border-slate-800'>
          <div className='flex items-center mb-8'>
            <div className='bg-emerald-500 p-2 rounded-xl mr-3'>
              <Trophy className='w-5 h-5 text-white' />
            </div>
            <h3 className='font-black tracking-tight text-xl'>
              The Hall of Shame
            </h3>
          </div>

          <div className='space-y-6'>
            {topOffenders.length > 0 ? (
              topOffenders.map((report, index) => (
                <div
                  key={report.id || index}
                  className='flex items-center group'
                >
                  <span className='text-3xl font-black text-slate-700 mr-4 group-hover:text-emerald-500 transition-colors'>
                    {index + 1}
                  </span>

                  <div className='flex-1 min-w-0'>
                    <p className='font-bold truncate text-slate-100 group-hover:text-emerald-400 transition-colors'>
                      {report.domain}
                    </p>
                    <div className='flex items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mt-1'>
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
              <p className='text-xs font-bold text-slate-500 italic uppercase tracking-widest text-center py-4'>
                No verified threats yet.
              </p>
            )}
          </div>
        </div>

        {/* --- SECTION 2: TRENDING THREATS --- */}
        <div className='bg-slate-50 border border-slate-100 rounded-[32px] p-8'>
          <div className='flex items-center mb-8'>
            <div className='bg-orange-100 p-2 rounded-xl mr-3'>
              <Flame className='w-5 h-5 text-orange-600' />
            </div>
            <h3 className='font-black text-slate-900 tracking-tight'>
              Trending Threats
            </h3>
          </div>

          <div className='space-y-6'>
            {trending.length > 0 ? (
              trending.map(([threatName, count]) => (
                <div key={threatName} className='group cursor-pointer'>
                  <div className='flex justify-between items-start mb-1'>
                    <span className='text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors'>
                      {threatName}
                    </span>
                    <ArrowUpRight className='w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-all' />
                  </div>
                  <div className='flex items-center'>
                    <div className='flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-slate-900 group-hover:bg-emerald-500 transition-all duration-500'
                        style={{ width: `${(count / reports.length) * 100}%` }}
                      />
                    </div>
                    <span className='ml-3 text-xs font-black text-slate-400'>
                      {count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-xs font-bold text-slate-400 italic uppercase tracking-widest text-center py-4'>
                Analyzing threat data...
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TrendingSidebar;
