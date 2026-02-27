import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Loader2,
  X,
  ExternalLink,
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
      if (!response.ok) throw new Error('Scanner Error');
      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
      toast.error('Scanner offline.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div id='scan' className='relative pt-24 md:pt-40 pb-32 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Strong, Line-Broken Headlines */}
        <h1 className='text-4xl md:text-7xl font-black tracking-tighter text-slate-900 mb-12 leading-[1.1] uppercase italic'>
          IS THE WEBSITE SAFE?
          <br />
          <span className='text-emerald-500'>IS IT REALLY AMAZON?</span>
          <br />
          VERIFY THE URL.
        </h1>

        <form onSubmit={handleScan} className='max-w-2xl mx-auto'>
          {/* URL Input */}
          <div className='mb-8'>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='Paste suspicious URL here...'
              className='w-full bg-white border-2 border-slate-100 py-6 px-8 rounded-[32px] text-lg font-bold shadow-2xl focus:border-emerald-500 transition-all outline-none'
            />
          </div>

          {/* Sticky Mobile Button / Standard Desktop Button */}
          <div className='fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 md:static md:bg-transparent md:border-none md:p-0 z-50'>
            <button
              type='submit'
              disabled={isScanning}
              className='w-full md:w-auto md:px-16 bg-slate-900 text-white py-6 rounded-[24px] md:rounded-[32px] font-black hover:bg-emerald-600 transition-all flex items-center justify-center disabled:opacity-50 shadow-2xl'
            >
              {isScanning ? (
                <Loader2 className='w-6 h-6 animate-spin' />
              ) : (
                <>
                  <Search className='w-6 h-6 mr-3' />
                  <span className='text-xl'>Analyze Now</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Scan Result Card */}
        {scanResult && (
          <div
            className={`max-w-2xl mx-auto mt-12 p-8 rounded-[40px] border-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
              scanResult.safe
                ? 'bg-emerald-50 border-emerald-100'
                : 'bg-red-50 border-red-100'
            }`}
          >
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-4 text-left'>
                {scanResult.safe ? (
                  <ShieldCheck className='text-emerald-500 w-10 h-10' />
                ) : (
                  <ShieldAlert className='text-red-500 w-10 h-10' />
                )}
                <div>
                  <h3 className='text-2xl font-black uppercase text-slate-900'>
                    {scanResult.safe ? 'Clear' : 'Threat'}
                  </h3>
                  <p className='text-xs font-bold opacity-40 uppercase tracking-widest'>
                    Source: {scanResult.source || 'Aggregator'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setScanResult(null)}
                className='p-2 hover:bg-white rounded-full transition-colors'
              >
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
              <p className='font-bold text-slate-700'>
                {scanResult.safe
                  ? 'No threats found in the Evidence Locker.'
                  : scanResult.report?.notes}
              </p>
            </div>

            <div className='flex flex-wrap gap-4 pt-2'>
              <a
                href={`https://www.virustotal.com/gui/domain/${analyzedUrl}`}
                target='_blank'
                rel='noreferrer'
                className='text-xs font-black text-slate-400 hover:text-red-500 uppercase flex items-center gap-1'
              >
                <ExternalLink className='w-3 h-3' /> VirusTotal
              </a>
              <a
                href={`https://safebrowsing.google.com/safebrowsing/report_badware/?url=${encodeURIComponent(analyzedUrl)}`}
                target='_blank'
                rel='noreferrer'
                className='text-xs font-black text-slate-400 hover:text-blue-500 uppercase flex items-center gap-1'
              >
                <ExternalLink className='w-3 h-3' /> Google
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
