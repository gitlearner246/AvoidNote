import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Prevent multiple Prisma instances in development
const globalForPrisma = global;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  // Set JSON header immediately to prevent "Unexpected token" errors
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    try {
      const reports = await prisma.report.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(reports);
    } catch (error) {
      console.error('Database Fetch Error:', error);
      return res
        .status(500)
        .json({ error: 'Database connection failed', message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const newReport = await prisma.report.create({ data: req.body });
      return res.status(201).json(newReport);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save record' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
