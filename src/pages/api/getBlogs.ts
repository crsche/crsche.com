import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogsMetadata } from '../../utils/blogs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO: CLient vs server side caching
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=3600',
  );

  const blogs = await getBlogsMetadata();
  res.status(200).json(blogs);
}
