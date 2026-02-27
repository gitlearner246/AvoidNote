import { prisma } from '../src/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { id, secret } = req.body;

  // Security Check: Only delete if the secret matches
  if (secret !== process.env.ADMIN_SECRET) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: Incorrect Secret Key' });
  }

  try {
    await prisma.report.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete report' });
  }
}
