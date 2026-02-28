import React, { useState } from 'react';
import { LanguageContext } from './LanguageContext';

const translations = {
  en: {
    verifiedThreats: 'Confirmed Scam Websites',
    searchPlaceholder: 'Search websites...',
    noRecords: 'No matching websites found.',
    privacyPolicy: 'Privacy Policy',
    legalContact: 'Legal Contact',
    all: 'all',
    critical: 'critical',
    warning: 'warning',
    // FIXED: Full sentence translation with embedded styling
    heroHeadline: (
      <>
        Analyze{' '}
        <span className='text-[#10B981] underline decoration-4'>URL</span> for
        your{' '}
        <span className='text-[#3949AB] underline decoration-4'>Safety</span>.
      </>
    ),
    globalMonitor: 'Live Global Threat Monitor',
    detectedScams: 'Detected Scams',
    urlPlaceholder: 'Paste suspicious URL here...',
    analyzeNow: 'Analyze Now',
    deadLink: 'Dead Link',
    clear: 'Clear',
    threat: 'Threat',
    source: 'Source',
    target: 'Target',
    clearedMsg: 'Domain cleared by global aggregator.',
  },
  de: {
    verifiedThreats: 'Bestätigte Betrugsseiten',
    searchPlaceholder: 'Webseiten durchsuchen...',
    noRecords: 'Keine passenden Webseiten gefunden.',
    privacyPolicy: 'Datenschutzrichtlinie',
    legalContact: 'Rechtlicher Kontakt',
    all: 'alle',
    critical: 'kritisch',
    warning: 'warnung',
    heroHeadline: (
      <>
        Analysieren Sie{' '}
        <span className='text-[#10B981] underline decoration-4'>URLs</span> für
        Ihre{' '}
        <span className='text-[#3949AB] underline decoration-4'>
          Sicherheit
        </span>
        .
      </>
    ),
    globalMonitor: 'Live Globaler Bedrohungsmonitor',
    detectedScams: 'Erkannte Scams',
    urlPlaceholder: 'Verdächtige URL hier einfügen...',
    analyzeNow: 'Jetzt Analysieren',
    deadLink: 'Toter Link',
    clear: 'Sicher',
    threat: 'Bedrohung',
    source: 'Quelle',
    target: 'Ziel',
    clearedMsg: 'Domain von globalem Aggregator freigegeben.',
  },
  el: {
    verifiedThreats: 'Επιβεβαιωμένες Απάτες',
    searchPlaceholder: 'Αναζήτηση ιστοσελίδων...',
    noRecords: 'Δεν βρέθηκαν αποτελέσματα.',
    privacyPolicy: 'Πολιτική Απορρήτου',
    legalContact: 'Νομική Επικοινωνία',
    all: 'όλα',
    critical: 'κρίσιμο',
    warning: 'προειδοποίηση',
    heroHeadline: (
      <>
        Αναλύστε το{' '}
        <span className='text-[#10B981] underline decoration-4'>URL</span> για
        την{' '}
        <span className='text-[#3949AB] underline decoration-4'>Ασφάλειά</span>{' '}
        σας.
      </>
    ),
    globalMonitor: 'Ζωντανή Παγκόσμια Παρακολούθηση Απειλών',
    detectedScams: 'Εντοπισμένες Απάτες',
    urlPlaceholder: 'Επικολλήστε το ύποπτο URL εδώ...',
    analyzeNow: 'Ανάλυση Τώρα',
    deadLink: 'Νεκρός Σύνδεσμος',
    clear: 'Ασφαλές',
    threat: 'Απειλή',
    source: 'Πηγή',
    target: 'Στόχος',
    clearedMsg: 'Ο τομέας εκκαθαρίστηκε από παγκόσμιο αθροιστή.',
  },
  ja: {
    verifiedThreats: '確認済みの詐欺サイト',
    searchPlaceholder: 'サイトを検索...',
    noRecords: '該当するサイトは見つかりませんでした。',
    privacyPolicy: 'プライバシーポリシー',
    legalContact: '法務連絡先',
    all: 'すべて',
    critical: '重大',
    warning: '警告',
    heroHeadline: (
      <>
        あなたの
        <span className='text-[#3949AB] underline decoration-4'>安全</span>
        のために
        <span className='text-[#10B981] underline decoration-4'>URL</span>
        を分析します。
      </>
    ),
    globalMonitor: 'LIVE:世界で検出されたスパムの数',
    detectedScams: '検出された詐欺',
    urlPlaceholder: 'ここに不審なURLを貼り付けてください...',
    analyzeNow: '今すぐ分析',
    deadLink: '無効なリンク',
    clear: 'クリア',
    threat: '脅威',
    source: 'ソース',
    target: 'ターゲット',
    clearedMsg: 'グローバルアグリゲーターによってドメインがクリアされました。',
  },
};

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
