import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Loader2,
  X,
  ExternalLink,
  Database,
} from 'lucide-react';
import { toast } from 'sonner';

const Hero = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');

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
        throw new Error("Server error: Not receiving JSON. Use 'vercel dev'.");
      }

      if (!response.ok) throw new Error('Scanner Error');
      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
      toast.error('Scan failed.', { description: err.message });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div id='scan' className='relative pt-24 md:pt-40 pb-8 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* The Title */}
        <h1 className='text-xl md:text-3xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.2] italic'>
          Analyze{' '}
          <span className='text-emerald-500 underline decoration-4'>URL</span>{' '}
          for your{' '}
          <span className='text-blue-600 underline decoration-4'>Safety</span>.
        </h1>

        {/* The Verification Logos (Pushes content down on mobile) */}
        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12 opacity-50 grayscale'>
          <div className='flex items-center gap-2 font-black text-slate-800 tracking-tighter text-sm md:text-lg'>
            <Search className='w-5 h-5 md:w-6 md:h-6' strokeWidth={3} />{' '}
            VIRUSTOTAL
          </div>
          <div className='flex items-center gap-2 font-black text-slate-800 tracking-tighter text-sm md:text-lg'>
            <ShieldCheck className='w-5 h-5 md:w-6 md:h-6' strokeWidth={3} />{' '}
            GOOGLE SAFE BROWSING
          </div>
          <div className='flex items-center gap-2 font-black text-slate-800 tracking-tighter text-sm md:text-lg'>
            <Database className='w-5 h-5 md:w-6 md:h-6' strokeWidth={3} />{' '}
            AVOIDNOTE
          </div>
        </div>

        {/* The Input & Button Area */}
        <form onSubmit={handleScan} className='max-w-2xl mx-auto'>
          <div className='mb-6'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Paste suspicious URL here...'
              className='w-full bg-white border-2 border-slate-100 py-6 px-8 rounded-[32px] text-lg font-bold shadow-2xl focus:border-emerald-500 outline-none transition-all'
            />
          </div>

          {/* STANDARD CENTERED BUTTON: No 'fixed' positioning, no vanishing */}
          <div className='flex justify-center w-full'>
            <button
              type='submit'
              disabled={isScanning}
              className='w-full sm:w-auto min-w-[240px] px-12 py-6 bg-slate-900 text-white rounded-[32px] font-black hover:bg-emerald-600 transition-all flex items-center justify-center disabled:opacity-50 shadow-2xl'
            >
              {isScanning ? (
                <Loader2 className='w-6 h-6 animate-spin' />
              ) : (
                <>
                  <Search className='w-6 h-6 mr-3' />
                  <span className='text-xl text-white font-black uppercase tracking-tight'>
                    Analyze Now
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {scanResult && (
          <div
            className={`max-w-2xl mx-auto mt-12 p-8 rounded-[40px] border-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${scanResult.safe ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-4 text-left'>
                {scanResult.safe ? (
                  <ShieldCheck className='text-emerald-500 w-10 h-10' />
                ) : (
                  <ShieldAlert className='text-red-500 w-10 h-10' />
                )}
                <div className='text-left'>
                  <h3 className='text-2xl font-black uppercase text-slate-900'>
                    {scanResult.safe ? 'Clear' : 'Threat'}
                  </h3>
                  <p className='text-xs font-bold opacity-40 uppercase tracking-widest'>
                    Source: {scanResult.source || 'Aggregator'}
                  </p>
                </div>
              </div>
              <button onClick={() => setScanResult(null)}>
                <X className='w-6 h-6 text-slate-300' />
              </button>
            </div>
            <div className='bg-white/60 p-6 rounded-[24px] text-left border border-white mb-4'>
              <p className='text-xs font-black uppercase tracking-widest text-slate-400 mb-1'>
                Target
              </p>
              <p className='text-lg font-black text-slate-900 break-all mb-4'>
                {analyzedUrl}
              </p>
              <p className='font-bold text-slate-700 text-left'>
                {scanResult.safe
                  ? 'No known threats detected in the records.'
                  : scanResult.report?.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
