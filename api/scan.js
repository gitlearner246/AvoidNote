import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dns from 'dns';
import { promisify } from 'util';

const lookup = promisify(dns.lookup);

const globalForPrisma = global;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const cleanUrl = url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split('?')[0]
      .toLowerCase();

    // --- NEW: DNS EXISTENCE CHECK ---
    try {
      await lookup(cleanUrl);
    } catch (dnsError) {
      // If DNS lookup fails, the domain doesn't exist
      return res.status(200).json({
        safe: false,
        source: 'DNS Verification',
        exists: false,
        report: {
          type: 'Non-Existent Domain',
          notes:
            'This URL does not appear to be a live website. Check for typos.',
        },
      });
    }

    // 1. Local Database Check
    const localMatch = await prisma.report.findFirst({
      where: { domain: { equals: cleanUrl, mode: 'insensitive' } },
    });

    if (localMatch) {
      return res.status(200).json({
        safe: false,
        exists: true,
        source: 'AvoidNote Database',
        report: localMatch,
      });
    }

    // 2. Passive TLD Analysis
    const suspiciousTLDs = ['.top', '.xyz', '.click', '.win', '.zip', '.icu'];
    const isSuspiciousTLD = suspiciousTLDs.some((tld) =>
      cleanUrl.endsWith(tld),
    );

    if (isSuspiciousTLD) {
      return res.status(200).json({
        safe: false,
        exists: true,
        source: 'TLD Analysis',
        report: {
          type: 'High-Risk Domain Extension',
          notes:
            'This TLD is frequently used for phishing. Use extreme caution.',
        },
      });
    }

    // 3. Global Default
    return res.status(200).json({
      safe: true,
      exists: true,
      source: 'Global Search',
    });
  } catch (error) {
    console.error('Scan API Error:', error);
    return res.status(500).json({ error: 'Scanner Error' });
  }
}
