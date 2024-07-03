// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { performs } from '@/lib/fake/performs';

type Data = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: any[] | Record<string, any> | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { perform_id } = req.query as { perform_id: string };
  res.status(200).json({
    success: true,
    data: performs.find((perform) => perform.id === perform_id) ?? null,
  });
}
