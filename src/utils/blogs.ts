import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
// import rehypeHighlight from 'rehype-highlight';
import remarkPrism from 'remark-prism';

const blogsPath = path.join(process.cwd(), 'blogs');

export interface BlogPostData {
  content: MDXRemoteSerializeResult;
  data: { [key: string]: string }; // Adjust frontmatter types as needed
  slug: string;
}

// export interface BlogSource {
//   fileName: string;
//   slug: string;
// }

// export async function getAllBlogs(): Promise<BlogPostData[]> {
//   const fileNames = fs.readdirSync(blogsPath);
//   const blogs = fileNames
//     .filter((fileName) => fileName.match(/\.mdx?$/))
//     .map((fileName) => {
//       const slug = fileName.replace(/\.mdx?$/, '');
//       return getBlogData(slug);
//     });

//   return Promise.all(blogs);
// }

export async function getBlogSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(blogsPath);
  const blogs = fileNames
    .filter((fileName) => fileName.match(/\.mdx?$/))
    .map((fileName) => fileName.replace(/\.mdx?$/, ''));

  return blogs;
}

export async function getBlogData(slug: string): Promise<BlogPostData> {
  const mdxPath = path.join(blogsPath, slug + '.mdx');
  const mdPath = path.join(blogsPath, slug + '.md');
  const sourcePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(sourcePath, 'utf8');

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkPrism],
      // rehypePlugins: [rehypeHighlight],
    },
  });

  return { content: mdxSource, data, slug };
}
