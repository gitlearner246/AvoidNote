import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Loader2,
  X,
  Database,
  Activity,
} from 'lucide-react';
import { toast } from 'sonner';

const Hero = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');

  // GLOBAL THREAT COUNTER LOGIC
  const [globalThreats, setGlobalThreats] = useState(24789104);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalThreats((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!url) return;
    setIsScanning(true);
    setScanResult(null);
    setAnalyzedUrl(url);

    try {
      const response = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error("Server error: Check 'vercel dev' status.");
      }
      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      toast.error('Scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div id='scan' className='relative pt-24 md:pt-40 pb-12 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Main Headline */}
        <h1 className='text-2xl md:text-5xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.1] italic'>
          Analyze{' '}
          <span className='text-[#10B981] underline decoration-4'>URL</span> for
          your{' '}
          <span className='text-[#3949AB] underline decoration-4'>Safety</span>.
        </h1>

        {/* COLORED LOGOS: Professional Industry Partners */}
        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-12'>
          {/* MULTI-COLOR GOOGLE */}
          <div className='flex items-center gap-2 font-black tracking-tighter text-lg md:text-2xl select-none'>
            <span className='text-[#4285F4]'>G</span>
            <span className='text-[#EA4335]'>o</span>
            <span className='text-[#FBBC05]'>o</span>
            <span className='text-[#4285F4]'>g</span>
            <span className='text-[#34A853]'>l</span>
            <span className='text-[#EA4335]'>e</span>
          </div>

          {/* VIRUSTOTAL BLUE */}
          <div className='flex items-center gap-2 font-black tracking-tighter text-sm md:text-lg'>
            <ShieldCheck
              className='w-5 h-5 md:w-6 md:h-6 text-[#3949AB]'
              strokeWidth={3}
            />
            <span className='text-[#3949AB]'>VIRUSTOTAL</span>
          </div>

          {/* PHISHTANK - Industry standard green */}
          <div className='flex items-center gap-2 font-black tracking-tighter text-sm md:text-lg'>
            <Database
              className='w-5 h-5 md:w-6 md:h-6 text-[#7FB344]'
              strokeWidth={3}
            />
            <span className='text-[#7FB344]'>PHISHTANK</span>
          </div>

          {/* URLSCAN.IO - Tech blue */}
          <div className='flex items-center gap-2 font-black tracking-tighter text-sm md:text-lg'>
            <Activity
              className='w-5 h-5 md:w-6 md:h-6 text-[#0070f3]'
              strokeWidth={3}
            />
            <span className='text-[#0070f3]'>URLSCAN.IO</span>
          </div>
        </div>

        {/* GLOBAL SPAM COUNTER */}
        <div className='mb-8 flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-2'>
            <div className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
            </div>
            <p className='text-[10px] md:text-xs font-black text-red-500 uppercase tracking-[0.2em]'>
              Live Global Threat Monitor
            </p>
          </div>
          <p className='text-2xl md:text-4xl font-black text-slate-900 tracking-tighter tabular-nums'>
            {globalThreats.toLocaleString()}
            <br />
            <span className='text-grey-200 text-sm ml-2 uppercase font-bold tracking-widest'>
              Detected Scams
            </span>
          </p>
        </div>

        <form onSubmit={handleScan} className='max-w-2xl mx-auto'>
          <div className='mb-8'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Paste suspicious URL here...'
              className='w-full bg-white border-2 border-slate-100 py-6 px-8 rounded-[32px] text-lg font-bold shadow-2xl focus:border-[#10B981] outline-none transition-all'
            />
          </div>

          <div className='flex justify-center w-full'>
            <button
              type='submit'
              disabled={isScanning}
              className='w-full sm:w-auto min-w-[260px] px-12 py-6 bg-slate-900 text-white rounded-[32px] font-black hover:bg-[#10B981] transition-all flex items-center justify-center disabled:opacity-50 shadow-2xl group'
            >
              {isScanning ? (
                <Loader2 className='w-6 h-6 animate-spin' />
              ) : (
                <>
                  <Activity className='w-6 h-6 mr-3 text-[#10B981] group-hover:animate-pulse' />
                  <span className='text-xl text-white font-black uppercase tracking-tight'>
                    Analyze Now
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Scan Results Card */}
        {scanResult && (
          <div
            className={`max-w-2xl mx-auto mt-12 p-8 rounded-[40px] border-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${scanResult.safe ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-4 text-left'>
                {scanResult.safe ? (
                  <ShieldCheck className='text-[#10B981] w-10 h-10' />
                ) : (
                  <ShieldAlert className='text-red-500 w-10 h-10' />
                )}
                <div className='text-left'>
                  <h3 className='text-2xl font-black uppercase text-slate-900'>
                    {scanResult.safe ? 'Clear' : 'Threat'}
                  </h3>
                  <p className='text-xs font-bold opacity-40 uppercase tracking-widest'>
                    Source: {scanResult.source}
                  </p>
                </div>
              </div>
              <button onClick={() => setScanResult(null)}>
                <X className='w-6 h-6 text-slate-300' />
              </button>
            </div>
            <div className='bg-white/60 p-6 rounded-[24px] text-left border border-white'>
              <p className='text-lg font-black text-slate-900 break-all mb-4'>
                {analyzedUrl}
              </p>
              <p className='font-bold text-slate-700'>
                {/* Inside Hero.jsx Scan Results Card logic */}
                {scanResult && (
                  <div
                    className={`max-w-2xl mx-auto mt-12 p-8 rounded-[40px] border-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                      scanResult.exists === false
                        ? 'bg-slate-50 border-slate-200' // Neutral style for non-existent domains
                        : scanResult.safe
                          ? 'bg-emerald-50 border-emerald-100'
                          : 'bg-red-50 border-red-100'
                    }`}
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-4 text-left'>
                        {scanResult.exists === false ? (
                          <X className='text-slate-400 w-10 h-10' />
                        ) : scanResult.safe ? (
                          <ShieldCheck className='text-[#10B981] w-10 h-10' />
                        ) : (
                          <ShieldAlert className='text-red-500 w-10 h-10' />
                        )}
                        <div className='text-left'>
                          <h3 className='text-2xl font-black uppercase text-slate-900'>
                            {scanResult.exists === false
                              ? 'Dead Link'
                              : scanResult.safe
                                ? 'Clear'
                                : 'Threat'}
                          </h3>
                          <p className='text-xs font-bold opacity-40 uppercase tracking-widest'>
                            Source: {scanResult.source}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setScanResult(null)}>
                        <X className='w-6 h-6 text-slate-300' />
                      </button>
                    </div>
                    <div className='bg-white/60 p-6 rounded-[24px] text-left border border-white'>
                      <p className='text-lg font-black text-slate-900 break-all mb-4'>
                        {analyzedUrl}
                      </p>
                      <p className='font-bold text-slate-700'>
                        {scanResult.report?.notes ||
                          'Domain cleared by global aggregator.'}
                      </p>
                    </div>
                  </div>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
