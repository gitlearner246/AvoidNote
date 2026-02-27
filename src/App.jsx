import React, { useState } from 'react';
import { Toaster } from 'sonner'; // Import the toaster
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ViolationCard from './components/ViolationCard';
import ReportModal from './components/ReportModal';
import ViolationDetail from './components/ViolationDetail';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([
    {
      id: 1,
      domain: 'free-prizes.net',
      type: 'Fake Close Button',
      severity: 'warning',
      time: '2 mins ago',
      description: 'The X button redirects to a download page.',
    },
    {
      id: 2,
      domain: 'stream-box.co',
      type: 'Malicious Redirect',
      severity: 'critical',
      time: '15 mins ago',
      description: 'Forces browser to open multiple phishing tabs.',
    },
  ]);

  const handleAddReport = (newReport) => {
    setReports([newReport, ...reports]);
  };

  return (
    <div className='min-h-screen bg-white text-slate-900 selection:bg-emerald-100 font-sans'>
      {/* 1. Add the Toaster component here */}
      <Toaster position='bottom-right' richColors expand={true} />

      <Navbar onReportClick={() => setIsModalOpen(true)} />

      <main>
        <Hero />

        <section id='reports' className='max-w-6xl mx-auto px-6 py-24'>
          <div className='mb-12'>
            <h2 className='text-4xl font-black tracking-tight text-slate-900'>
              The Evidence Locker
            </h2>
            <p className='text-slate-500 mt-3 text-lg font-medium'>
              Community-verified violations and dark patterns.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {reports.map((report) => (
              <ViolationCard
                key={report.id}
                report={report}
                onClick={(r) => setSelectedReport(r)}
              />
            ))}
          </div>
        </section>
      </main>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReport={handleAddReport}
      />

      <ViolationDetail
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      <footer className='py-20 text-center text-slate-400 text-sm border-t border-slate-100 bg-slate-50'>
        &copy; 2026 Avoid Note &bull; Secure the Web
      </footer>
    </div>
  );
}
