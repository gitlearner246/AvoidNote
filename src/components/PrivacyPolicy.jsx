import React from 'react';

export default function PrivacyPolicy({ onClose }) {
  return (
    <div className='fixed inset-0 z-[100] bg-white overflow-y-auto p-8 md:p-24 selection:bg-emerald-100'>
      <div className='max-w-3xl mx-auto'>
        <button
          onClick={onClose}
          className='mb-8 text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2'
        >
          <span>&larr;</span> Back to Top Page
        </button>

        <h1 className='text-5xl font-black mb-12 tracking-tight text-slate-900'>
          Privacy Policy & Legal Disclaimer
        </h1>

        <div className='prose prose-slate lg:prose-xl font-medium text-slate-600 space-y-12'>
          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              1. Scope of Service
            </h2>
            <p>
              Avoid Note is a public security resource providing a database of
              suspicious web domains. This platform is designed strictly for
              informational purposes to help users identify deceptive ad
              patterns, phishing attempts, and malicious redirects.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              2. Data Collection & Processing
            </h2>
            <p>
              We prioritize user anonymity. Avoid Note does not require user
              accounts, nor does it collect, store, or monetize personal data
              from visitors. We do not utilize tracking cookies or log
              individual IP addresses during domain lookups.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              3. Source of Information
            </h2>
            <p>
              Avoid Note functions as an aggregator of threat intelligence. The
              information presented is gathered from community reports, public
              blacklists, and external security APIs. We do not conduct
              independent primary forensic research on every listed domain.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              4. Legal Jurisdiction (GDPR)
            </h2>
            <p>
              Operating out of Salzburg, Austria, Avoid Note strictly complies
              with the General Data Protection Regulation (GDPR). Because no
              personal data is collected from visitors, your right to privacy is
              fundamentally protected by design.
            </p>
          </section>

          <section className='bg-slate-50 p-8 rounded-3xl border-2 border-slate-100'>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              5. Limitation of Liability & No Warranty
            </h2>
            <div className='text-sm space-y-4 text-slate-500 uppercase font-bold'>
              <p>
                The service is provided "as is" without warranty of any kind.
                Avoid Note is not responsible for the consequences of the
                results provided by the scanner or the Evidence Locker.
              </p>
              <p>
                Under no circumstances shall Avoid Note or its operators be
                liable for any direct, indirect, or incidental damages resulting
                from the use or misuse of this information. Users are advised to
                verify all results through independent security professionals
                before taking action.
              </p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              6. Trusted Security References
            </h2>
            <p className='mb-4'>
              For further verification of suspicious domains, we recommend the
              following industry-standard security resources:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-emerald-600 font-bold'>
              <li>
                <a
                  href='https://www.virustotal.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  VirusTotal
                </a>
              </li>
              <li>
                <a
                  href='https://www.phishtank.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  PhishTank
                </a>
              </li>
              <li>
                <a
                  href='https://safebrowsing.google.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  Google Safe Browsing
                </a>
              </li>
              <li>
                <a href='https://urlscan.io' target='_blank' rel='noreferrer'>
                  urlscan.io
                </a>
              </li>
            </ul>
          </section>

          <footer className='pt-24 text-sm text-slate-400 font-bold uppercase tracking-widest'>
            Last updated: February 2026 &bull; Salzburg, Austria
          </footer>
        </div>
      </div>
    </div>
  );
}
