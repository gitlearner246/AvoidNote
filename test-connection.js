import pkg from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import process from 'node:process';

const { PrismaClient } = pkg;
const { Pool } = pg;

// 1. Initialize the standard pg connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap the pool in Prisma's adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

async function verifyConnection() {
  try {
    console.log('Testing connection via Prisma 7 pg Adapter...');

    // Attempt a simple database query
    const count = await prisma.report.count();

    console.log('✅ Success! Connection active.');
    console.log(`Current records in database: ${count}`);
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
  } finally {
    // Cleanly close both Prisma and the pg pool
    await prisma.$disconnect();
    await pool.end();
  }
}

verifyConnection();
