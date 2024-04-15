import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import { Octokit } from 'octokit';
import config from '../../config.json';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import axios from 'axios';

const blogsPath = path.join(process.cwd(), 'blogs');

export interface BlogPost {
  content: MDXRemoteSerializeResult;
  metadata: BlogMetadata;
}

export interface BlogMetadata {
  title: string;
  date: string;
  slug: string;
  tags: string[];
}

const octokit = new Octokit({ auth: process.env.GH_TOKEN });

async function getBlogDataFromRepo(fname: string): Promise<Buffer> {
  const path = config.blogRepo.path
    ? `${config.blogRepo.path}/${fname}`
    : fname;
  return await octokit.rest.repos
    .getContent({
      owner: config.blogRepo.owner,
      repo: config.blogRepo.repo,
      path: path,
    })
    .catch((err) => {
      throw new Error(err);
    })
    .then((res) => {
      if (!res) {
        throw new Error('Failed to fetch blog post');
      }
      const {
        data: { content },
      } = res as any;
      return Buffer.from(content, 'base64');
    });
}

async function getBlogDataFromURL(url: string): Promise<Buffer> {
  return axios
    .get(url, { responseType: 'arraybuffer' })
    .catch((err) => {
      throw new Error(err);
    })
    .then((resp) => {
      if (!resp || resp.status !== 200) {
        throw new Error('Failed to fetch blog post');
      }
      return Buffer.from(resp.data, 'binary');
    });
}

export async function getBlogsMetadata(): Promise<BlogMetadata[]> {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: config.blogRepo.owner,
      repo: config.blogRepo.repo,
      path: config.blogRepo.path,
    },
  );
  return Promise.all(
    (data as any[]).map(async (file) => {
      const fData = await getBlogDataFromURL(file.download_url).catch((err) => {
        throw new Error(err);
      });

      const content = await serialize(fData, {
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkPrism,
            remarkFrontmatter,
            remarkMdxFrontmatter,
          ],
        },
        parseFrontmatter: true,
      });
      const { title, date, tags } = content.frontmatter as any;

      return {
        title,
        date,
        slug: file.name.replace(/\.mdx?/, ''),
        tags,
      };
    }),
  );
}

export async function getBlogPost(fname: string): Promise<BlogPost> {
  const fData = await getBlogDataFromRepo(fname);
  const content = await serialize(fData, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkPrism,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
    },
    parseFrontmatter: true,
  });
  // TODO: What happens if we don't have these fields?
  const { title, date, tags } = content.frontmatter as any;
  return {
    content,
    metadata: {
      title,
      date,
      slug: fname.replace(/\.mdx?/, ''),
      tags,
    },
  };
  // return await getMetadata(fname, fData);
}

// export async function getBlog(fname: string): Promise<BlogPostData> {
//   const fData = await getBlogData(fname);

//   const mdx = await serialize(fData, {
//     mdxOptions: {
//       remarkPlugins: [remarkGfm, remarkPrism],
//     },
//   });

//   const metadata: BlogMetadata = {
//     title: 'Title',
//     date: 'Date',
//     slug: 'Slug',
//     tags: ['Tags'],
//   };

//   return { content: mdx, metadata };
// }

// export async function getBlogSlugs(): Promise<string[]> {
//   const fileNames = fs.readdirSync(blogsPath);
//   const blogs = fileNames
//     .filter((fileName) => fileName.match(/\.mdx?$/))
//     .map((fileName) => fileName.replace(/\.mdx?$/, ''));

//   return blogs;
// }

// export async function getBlogData(slug: string): Promise<BlogPostData> {
//   const mdxPath = path.join(blogsPath, slug + '.mdx');
//   const mdPath = path.join(blogsPath, slug + '.md');
//   const sourcePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
//   const fileContents = fs.readFileSync(sourcePath, 'utf8');

//   const { data, content } = matter(fileContents);

//   const mdxSource = await serialize(content, {
//     mdxOptions: {
//       remarkPlugins: [remarkGfm, remarkPrism],
//       // rehypePlugins: [rehypeHighlight],
//     },
//   });

//   return { content: mdxSource, data };
// }
