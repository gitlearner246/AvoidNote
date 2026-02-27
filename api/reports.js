import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Initialize without the Node.js ESM hacks
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const reports = await prisma.report.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(reports);
    } catch (error) {
      // Force Vercel to expose the REAL error instead of a generic 500
      console.error('Vercel Backend Crash:', error);
      return res.status(500).json({
        error: 'Backend Crash',
        message: error.message,
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const newReport = await prisma.report.create({
        data: req.body,
      });
      return res.status(201).json(newReport);
    } catch (error) {
      console.error('Vercel Save Error:', error);
      return res.status(500).json({ error: 'Failed to save report' });
    }
  }

  return res.status(405).end();
}
