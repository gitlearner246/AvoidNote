import pkg from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import process from 'node:process'; // <-- This is the missing piece I forgot

const { PrismaClient } = pkg;
const { Pool } = pg;

// 1. Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap it in the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Prevent multiple connections during hot-reloads
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
