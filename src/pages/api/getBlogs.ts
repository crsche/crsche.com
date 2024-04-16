import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogsMetadata } from '../../utils/blogs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO: CLient vs server side caching
  res.setHeader(
    'Cache-Control',
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  );

  const blogs = await getBlogsMetadata();
  console.warn(`recached getBlogs`);
  res.status(200).json(blogs);
}
