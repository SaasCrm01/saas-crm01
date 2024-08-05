import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clients = await prisma.client.findMany();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching clients' });
    }
  } else if (req.method === 'POST') {
    const { name, email, phone, user } = req.body;

    try {
      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          user, // Ensure 'user' is included in the request body
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
