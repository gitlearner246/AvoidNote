import React from 'react';
import { X, ShieldAlert, Globe, Calendar, Info } from 'lucide-react';

const ViolationDetail = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className='fixed inset-0 z-[110] flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
        onClick={onClose}
      ></div>

      <div className='relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200'>
        <div className='p-8'>
          <div className='flex justify-between items-start mb-6'>
            <div className='p-3 bg-rose-50 rounded-2xl'>
              <ShieldAlert className='text-rose-500' size={32} />
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-100 rounded-full transition-colors'
            >
              <X size={24} className='text-slate-400' />
            </button>
          </div>

          <h2 className='text-3xl font-bold text-slate-900 mb-2'>
            {report.domain}
          </h2>
          <div className='flex gap-3 mb-8'>
            <span className='px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wide'>
              {report.type}
            </span>
            <span className='px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-wide'>
              {report.severity} Severity
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='flex items-start gap-3'>
              <Globe className='text-slate-400' size={20} />
              <div>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                  Full URL
                </p>
                <p className='text-sm text-slate-700 break-all'>
                  https://{report.domain}/ad-path/click-target
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <Calendar className='text-slate-400' size={20} />
              <div>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                  Reported On
                </p>
                <p className='text-sm text-slate-700'>{report.time}</p>
              </div>
            </div>
          </div>

          <div className='p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8'>
            <div className='flex items-center gap-2 mb-3 text-slate-900 font-bold'>
              <Info size={18} className='text-emerald-500' />
              Full Report Description
            </div>
            <p className='text-slate-600 leading-relaxed'>
              {report.description} This site uses a script that disables the
              browser "back" button and forces a full-screen overlay that cannot
              be closed without clicking the ad content.
            </p>
          </div>

          <div className='flex gap-4'>
            <button className='flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all'>
              Official Google Report
            </button>
            <button className='flex-1 border border-slate-200 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all'>
              Submit Evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetail;
