import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, ShieldX } from 'lucide-react';

const MALICIOUS_DB = ['free-prizes.net', 'ultra-stream-service.co'];

const Hero = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setStatus('scanning');
    setTimeout(() => {
      let domain = url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .split('/')[0];
      setResult({
        isSafe: !MALICIOUS_DB.includes(domain.toLowerCase()),
        domain,
      });
      setStatus('results');
    }, 1000);
  };

  return (
    <section id='scan' className='pt-44 pb-32 px-6 bg-mesh'>
      <div className='max-w-3xl mx-auto text-center'>
        <h1 className='text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]'>
          The web, <br />
          <span className='text-emerald-500 italic'>unfiltered.</span>
        </h1>
        <p className='text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed'>
          The open-source intelligence platform to scan, report, and block
          deceptive ad patterns.
        </p>

        <form onSubmit={handleScan} className='relative max-w-xl mx-auto'>
          <div className='flex items-center bg-white border border-slate-200/60 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Enter a suspicious URL...'
              className='w-full bg-transparent border-none py-4 px-6 text-slate-900 placeholder-slate-400 outline-none text-base font-medium'
            />
            <button
              type='submit'
              className='bg-emerald-500 text-white h-12 px-8 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2'
            >
              {status === 'scanning' ? (
                <Loader2 className='animate-spin' size={18} />
              ) : (
                'Analyze'
              )}
            </button>
          </div>

          {status === 'results' && (
            <div
              className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500 font-bold text-sm
              ${result.isSafe ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}
            >
              {result.isSafe ? (
                <CheckCircle2 size={18} />
              ) : (
                <ShieldX size={18} />
              )}
              {result.isSafe
                ? `${result.domain} appears to be safe.`
                : `Alert: ${result.domain} is flagged.`}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Hero;
