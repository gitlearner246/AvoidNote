import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ViolationCard from './components/ViolationCard';
import ViolationDetail from './components/ViolationDetail';
import TrendingSidebar from './components/TrendingSidebar';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/reports');
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API Route Sync Error');
        }
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error loading reports:', error);
        toast.error('Security Records offline.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || report.severity === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='min-h-screen bg-white text-slate-900 selection:bg-emerald-100 font-sans'>
      <Toaster position='bottom-right' richColors expand={true} />
      <Navbar />

      <main>
        <Hero totalThreats={reports.length} />

        {/* GAP FIXED: pt-0 brings the database right under the scanner */}
        <section id='reports' className='max-w-7xl mx-auto px-6 pt-0 pb-24'>
          <div className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-slate-50 pt-16'>
            <div className='flex-1 text-left'>
              {/* REPHRASED FOR CLARITY */}
              <h2 className='text-4xl font-black tracking-tight text-slate-900 uppercase italic'>
                Verified Threat Records
              </h2>
              <div className='flex gap-3 mt-6'>
                {['all', 'critical', 'warning'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className='relative group w-full md:w-96'>
              <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors' />
              <input
                type='text'
                placeholder='Search records...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-slate-50 border-2 border-slate-100 py-4 pl-12 pr-4 rounded-2xl font-bold focus:border-emerald-500 outline-none shadow-sm'
              />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row gap-12 text-left'>
            <div className='flex-1'>
              {isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='h-64 bg-slate-50 rounded-[32px] border-2 border-slate-100'
                    />
                  ))}
                </div>
              ) : filteredReports.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {filteredReports.map((report) => (
                    <ViolationCard
                      key={report.id}
                      report={report}
                      onClick={(r) => setSelectedReport(r)}
                    />
                  ))}
                </div>
              ) : (
                <div className='text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 w-full'>
                  <p className='text-slate-400 font-bold uppercase tracking-widest'>
                    No records found in database.
                  </p>
                </div>
              )}
            </div>
            {!isLoading && <TrendingSidebar reports={reports} />}
          </div>
        </section>
      </main>

      <ViolationDetail
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      <footer className='py-20 text-center border-t border-slate-100 bg-slate-50'>
        <div className='flex justify-center gap-8 mb-4 text-sm font-bold text-slate-400'>
          <button
            onClick={() => setShowPrivacy(true)}
            className='hover:text-slate-900 transition-colors'
          >
            Privacy Policy
          </button>
          <span>&bull;</span>
          <a
            href='mailto:support@avoidnote.com'
            className='hover:text-slate-900 transition-colors'
          >
            Legal Contact
          </a>
        </div>
        <p className='text-slate-400 text-xs'>
          &copy; 2026 Avoid Note &bull; Salzburg, Austria
        </p>
      </footer>
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}
