import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);

  // Get data from the URL parameters
  const domain = searchParams.get('domain') || 'Unknown Domain';
  const type = searchParams.get('type') || 'Security Alert';
  const severity = searchParams.get('severity') || 'warning';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '80px',
        borderLeft: '20px solid #10b981', // Your Emerald Green
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: '#10b981',
          marginBottom: 20,
        }}
      >
        AVOID NOTE // EVIDENCE_LOG
      </div>
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: '#0f172a',
          letterSpacing: '-0.05em',
          marginBottom: 20,
        }}
      >
        {domain}
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: severity === 'critical' ? '#ef4444' : '#f59e0b',
          backgroundColor: severity === 'critical' ? '#fef2f2' : '#fffbeb',
          padding: '10px 20px',
          borderRadius: '12px',
          border: '2px solid',
        }}
      >
        Detected: {type}
      </div>
      <div
        style={{
          fontSize: 24,
          color: '#64748b',
          marginTop: 'auto',
          fontWeight: 500,
        }}
      >
        Community-verified dark pattern report &bull; avoid-note.vercel.app
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
