// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { films } from '@/lib/fake/films';

type Data = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: any[] | Record<string, any> | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { film_id } = req.query as { film_id: string };
  res.status(200).json({
    success: true,
    data: films.find((film) => film.id === film_id) ?? null,
  });
}
