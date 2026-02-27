import React from 'react';

export default function PrivacyPolicy({ onClose }) {
  return (
    <div className='fixed inset-0 z-[100] bg-white overflow-y-auto p-8 md:p-24 selection:bg-emerald-100'>
      <div className='max-w-3xl mx-auto'>
        <button
          onClick={onClose}
          className='mb-8 text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2'
        >
          <span>&larr;</span> Back to Evidence Locker
        </button>

        <h1 className='text-5xl font-black mb-12 tracking-tight text-slate-900'>
          Privacy Policy
        </h1>

        <div className='prose prose-slate lg:prose-xl font-medium text-slate-600 space-y-12'>
          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              1. Scope of Service
            </h2>
            <p>
              Avoid Note is a public security resource providing an "Evidence
              Locker" of suspicious web domains. This platform is designed for
              informational purposes to help users identify deceptive ad
              patterns and malicious redirects.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              2. Data Collection & Processing
            </h2>
            <p>
              We prioritize user anonymity. Avoid Note does not require user
              accounts, nor does it collect, store, or sell personal data from
              visitors. We do not use tracking cookies or record individual IP
              addresses during domain lookups.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              3. Accuracy of Evidence
            </h2>
            <p>
              The domains listed in the Evidence Locker are flagged based on
              specific technical criteria (e.g., spoofing, phishing, or
              malicious behavior). If you represent a domain listed here and
              believe it is in error, please contact our Salzburg-based
              administrative team for review.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-bold text-slate-900 mb-4'>
              4. Legal Jurisdiction (GDPR)
            </h2>
            <p>
              Operating out of Salzburg, Austria, Avoid Note complies with the
              General Data Protection Regulation (GDPR). Since no personal data
              is collected from visitors, your right to privacy is maintained by
              design.
            </p>
          </section>

          <footer className='pt-24 text-sm text-slate-400 font-bold uppercase tracking-widest'>
            Last updated: February 2026 &bull; Salzburg, Austria
          </footer>
        </div>
      </div>
    </div>
  );
}
