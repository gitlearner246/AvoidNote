import { prisma } from '../src/lib/prisma';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  // Clean the URL (remove https://, www, etc.)
  const cleanDomain = url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
    .split('/')[0]
    .toLowerCase();

  try {
    // Search the database for an exact match or a partial match
    const result = await prisma.report.findFirst({
      where: {
        domain: {
          contains: cleanDomain,
          mode: 'insensitive',
        },
      },
    });

    if (result) {
      return res.status(200).json({ safe: false, report: result });
    } else {
      return res.status(200).json({ safe: true });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Database check failed' });
  }
}
