// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { cinemas } from '@/lib/fake/cinemas';

type Data = {
  success: boolean;
  data: any[] | Record<string, any>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    success: true,
    data: cinemas,
  });
}
