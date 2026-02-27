import process, { loadEnvFile } from 'node:process';

// Force Node to load the .env file before Prisma executes
try {
  loadEnvFile();
} catch (error) {
  // Fails silently if it is already loaded
}

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};