import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['user-id'] as string;

  if (!userId) {
    return res.status(401).json({ error: 'User ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const clients = await prisma.client.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching clients' });
    }
  } else if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    try {
      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          userId: parseInt(userId),
        },
      });
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: 'Error creating client' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
