import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Hero = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsScanning(true);

    try {
      const response = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.safe) {
        toast.success('No active threats found!', {
          description: "This domain isn't in our Evidence Locker yet.",
          icon: <ShieldCheck className='text-emerald-500' />,
        });
      } else {
        toast.error('Warning: Dark Pattern Detected', {
          description: `Identified as: ${data.report.type}`,
          icon: <ShieldAlert className='text-red-500' />,
        });
      }
    } catch (err) {
      toast.error('Scanner offline. Check your connection.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className='relative pt-32 pb-20 px-6 overflow-hidden'>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-7xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]'>
          STAY <span className='text-emerald-500 italic'>LEGIT.</span>
          <br />
          AVOID THE TRAP.
        </h1>

        <p className='text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto'>
          The web's community-driven defense against deceptive ad patterns,
          malicious redirects, and dark interfaces.
        </p>

        <form
          onSubmit={handleScan}
          className='relative max-w-2xl mx-auto group'
        >
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Paste suspicious URL here...'
            className='w-full bg-white border-2 border-slate-100 py-6 px-8 rounded-[32px] text-lg font-bold shadow-2xl focus:border-emerald-500 focus:ring-0 transition-all outline-none'
          />
          <button
            type='submit'
            disabled={isScanning}
            className='absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-8 rounded-[24px] font-black hover:bg-emerald-600 transition-all flex items-center disabled:opacity-50'
          >
            {isScanning ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <>
                <Search className='w-5 h-5 mr-2' />
                Analyze
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
