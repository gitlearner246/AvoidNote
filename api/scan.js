import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// --- PRISMA SINGLETON: Prevents connection leaks on your ASUS TUF ---
const globalForPrisma = global;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  // Explicitly set JSON header to prevent the "Unexpected Token" error
  res.setHeader('Content-Type', 'application/json');

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    // Robust URL cleaning
    const cleanUrl = url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0]
      .split('?')[0] // Remove query params
      .toLowerCase();

    // 1. Local Database Check (The 100+ seeds)
    const localMatch = await prisma.report.findFirst({
      where: { domain: { equals: cleanUrl, mode: 'insensitive' } },
    });

    if (localMatch) {
      return res.status(200).json({
        safe: false,
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
      source: 'Global Search',
    });
  } catch (error) {
    console.error('Scan API Error:', error);
    return res.status(500).json({
      error: 'Scanner Error',
      message: error.message,
    });
  }
}
