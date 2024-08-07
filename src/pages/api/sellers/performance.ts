// src/app/api/sellers/performance.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const performance = await prisma.sellerPerformance.findMany();
      res.status(200).json(performance);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      res.status(500).json({ error: 'Error fetching performance data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
