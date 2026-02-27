import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const cleanUrl = url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .toLowerCase();

    // 1. Check your local Evidence Locker first (Fastest)
    const localMatch = await prisma.report.findFirst({
      where: { domain: { equals: cleanUrl, mode: 'insensitive' } },
    });

    if (localMatch) {
      return res
        .status(200)
        .json({ safe: false, source: 'Local Locker', report: localMatch });
    }

    // 2. If not found, check a Free External API (e.g., Google Safe Browsing or URLScan)
    // For now, let's use a "Passive Check" logic.
    // Real external API calls require an API Key in your .env

    // Logic: If the domain is very new or has a strange TLD (.top, .xyz),
    // we can flag it as "Unverified/Suspicious" as an aggregator.

    const suspiciousTLDs = ['.top', '.xyz', '.click', '.win', '.zip'];
    const isSuspiciousTLD = suspiciousTLDs.some((tld) =>
      cleanUrl.endsWith(tld),
    );

    if (isSuspiciousTLD) {
      return res.status(200).json({
        safe: false,
        source: 'TLD Analysis',
        report: {
          type: 'High-Risk Domain Extension',
          notes:
            'This TLD is frequently used for phishing. Use extreme caution.',
        },
      });
    }

    return res.status(200).json({ safe: true, source: 'Global Search' });
  } catch (error) {
    return res.status(500).json({ error: 'Scanner Error' });
  }
}
