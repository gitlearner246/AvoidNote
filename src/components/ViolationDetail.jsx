import React, { useState } from 'react';
import { X, ShieldAlert, Clock, Copy, ShieldCheck, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

const ViolationDetail = ({ report, onClose }) => {
  const [voted, setVoted] = useState(false);

  if (!report) return null;

  const timeAgo = report.createdAt
    ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
    : 'Recently';

  const ogImageUrl = `${window.location.origin}/api/og?domain=${report.domain}&type=${report.type}&severity=${report.severity}`;

  const XLogo = () => (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  );

  // --- Handlers ---

  const handleVerify = async () => {
    if (voted) return;
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: report.id }),
      });
      if (res.ok) {
        setVoted(true);
        toast.success('Community Verification Added!');
      }
    } catch (err) {
      toast.error('Verification failed.');
    }
  };

  const handleDelete = async () => {
    const password = prompt('Enter Admin Secret to purge this evidence:');
    if (!password) return;

    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: report.id, secret: password }),
      });

      if (response.ok) {
        toast.success('Evidence purged from the locker.');
        onClose();
        window.location.reload();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Purge failed.');
      }
    } catch (err) {
      toast.error('Network error.');
    }
  };

  const handleShareX = () => {
    const text = `🚨 Dark Pattern Alert on ${report.domain}!\n\nType: ${report.type}\nDetected via @AvoidNote`;
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/report/${report.id}`,
    );
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className='fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8'>
      <Helmet>
        <title>{report.domain} | Avoid Note Evidence</title>
        <meta property='og:image' content={ogImageUrl} />
        <meta name='twitter:image' content={ogImageUrl} />
        <meta name='twitter:card' content='summary_large_image' />
      </Helmet>

      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-md'
        onClick={onClose}
      ></div>

      <div className='relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300'>
        {/* Header Visual */}
        <div className='h-32 bg-slate-900 flex items-center justify-center relative overflow-hidden'>
          <div className='absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]'></div>
          <ShieldAlert className='w-12 h-12 text-emerald-500 relative z-10' />
          <button
            onClick={onClose}
            className='absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-10'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-4xl font-black text-slate-900 tracking-tighter'>
              {report.domain}
            </h2>
            <div className='flex items-center text-slate-400 text-sm font-bold'>
              <Clock className='w-4 h-4 mr-2' />
              {timeAgo}
            </div>
          </div>

          <div className='space-y-8'>
            {/* Vouch Button Section */}
            <button
              onClick={handleVerify}
              disabled={voted}
              className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center border-2 ${
                voted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-white border-slate-100 text-slate-900 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              <ShieldCheck className='w-5 h-5 mr-3' />
              {voted
                ? 'Verified by You'
                : `Vouch for this Evidence (${report.verifications || 0})`}
            </button>

            <div>
              <p className='text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2'>
                Violation Type
              </p>
              <p className='text-xl font-bold text-slate-800'>{report.type}</p>
            </div>

            <div>
              <p className='text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2'>
                Detailed Evidence
              </p>
              <p className='text-slate-600 text-lg leading-relaxed font-medium'>
                {report.description}
              </p>
            </div>

            {/* Publicize Actions */}
            <div className='pt-8 border-t border-slate-100'>
              <p className='text-center text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest'>
                Publicize this pattern
              </p>
              <div className='grid grid-cols-2 gap-4'>
                <button
                  onClick={handleShareX}
                  className='flex items-center justify-center bg-black text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95'
                >
                  <XLogo />
                  <span className='ml-3'>Post to X</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className='flex items-center justify-center bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95'
                >
                  <Copy className='w-4 h-4 mr-3' />
                  Copy Link
                </button>
              </div>
            </div>

            {/* Admin Bypass */}
            <div className='mt-4 pt-4 flex justify-center'>
              <button
                onClick={handleDelete}
                className='text-[10px] flex items-center font-bold text-slate-200 hover:text-red-400 transition-colors uppercase tracking-[0.3em]'
              >
                <Trash2 className='w-3 h-3 mr-2' />
                Admin: Purge Evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetail;
