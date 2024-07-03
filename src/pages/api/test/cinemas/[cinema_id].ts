// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { cinemas } from '@/lib/fake/cinemas';

type Data = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: any[] | Record<string, any> | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cinema_id } = req.query as { cinema_id: string };
  res.status(200).json({
    success: true,
    data: cinemas.find((cinema) => cinema.id === cinema_id) ?? null,
  });
}
