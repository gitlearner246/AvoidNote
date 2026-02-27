import pkg from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import process from 'node:process';

const { PrismaClient } = pkg;
const { Pool } = pg;

// 1. Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Wrap it in the Prisma adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Emptying Locker ---');
  await prisma.report.deleteMany();

  const specificThreats = [
    { domain: 'get-free-coins.top', type: 'Phishing', severity: 'critical', notes: 'Crypto scam targeting wallet seeds.' },
    { domain: 'login-secure-bank.net', type: 'Spoofing', severity: 'critical', notes: 'Fake login portal for major banks.' },
    // ... (Keep your original 8 here if you want to be specific)
  ];

  const types = ['Phishing', 'Malware', 'Spoofing', 'Deceptive UI', 'Malicious Redirect'];
  const severities = ['critical', 'warning'];

  console.log('--- Generating 100+ Threats ---');

  // 1. Add your specific specificThreats
  for (const threat of specificThreats) {
    await prisma.report.create({ data: threat });
  }

  // 2. Add 100 Random suspicious seeds
  for (let i = 1; i <= 100; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];

    await prisma.report.create({
      data: {
        domain: `suspicious-site-${i}.xyz`,
        type: type,
        severity: severity,
        notes: `Automatically flagged as ${type} based on community reports.`,
      },
    });
  }

  console.log('🚀 100+ Evidence records successfully uploaded to the database!');
}

  for (const report of reports) {
    try {
      await prisma.report.create({ data: report });
      console.log(`✅ Seeded: ${report.domain}`);
    } catch (e) {
      console.error(`⚠️ Skip ${report.domain}:`, e.message);
    }
  }

  console.log('🚀 Seed successful: 8 domains are now live!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Turn off the gear
    await prisma.$disconnect();
    await pool.end();
  });
