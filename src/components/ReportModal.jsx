import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner'; // Import the toast function

const ReportModal = ({ isOpen, onClose, onAddReport }) => {
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('Fake Close Button');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      domain: domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0],
      type,
      severity: type === 'Malicious Redirect' ? 'critical' : 'warning',
      time: 'Just now',
      description,
    };

    onAddReport(newEntry);

    // 2. Trigger the Toast
    toast.success('Report Submitted!', {
      description: `Thank you for reporting ${newEntry.domain}.`,
    });

    setDomain('');
    setDescription('');
    onClose();
  };

  return (
    // ... rest of your modal code remains the same ...
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-slate-900/40 backdrop-blur-sm'
        onClick={onClose}
      ></div>
      <div className='relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200'>
        {/* Modal content from previous turn here */}
        <form className='p-8 space-y-6' onSubmit={handleSubmit}>
          {/* Form fields here */}
          <button
            type='submit'
            className='w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95'
          >
            Submit to Evidence Locker
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
