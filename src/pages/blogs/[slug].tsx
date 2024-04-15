import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BlogPost, getBlogPost } from '../../utils/blogs'; // Adjust path as needed
import 'highlight.js/styles/base16/gruvbox-dark-hard.min.css';
import Head from 'next/head';
import { Octokit } from 'octokit';
import config from '../../../config.json';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
// import rehypeHighlight from 'rehype-highlight';
import remarkPrism from 'remark-prism';
import matter from 'gray-matter';
import React from 'react';

// import styles from '../../styles/blog.module.css';
// import codehl from '../../styles/prism-gruvbox-dark.module.css';

// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
interface BlogPageProps {
  post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const repo = await octokit.request(
  //   'GET /repos/{owner}/{repo}/contents/{path}',
  //   {
  //     owner: config.blogRepo.owner,
  //     repo: config.blogRepo.repo,
  //     path: config.blogRepo.path,
  //   },
  // );

  // if (repo.status !== 200) {
  //   console.error('Failed to fetch blog posts');
  //   return { paths: [], fallback: false };
  // }
  // const slugs = Array.isArray(repo.data) ? repo.data : [];
  // const paths = slugs.map((file) => {
  //   return file.name.replace(/\.mdx?/, '');
  // });
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fname = `${slug}.mdx`;
  const post = await getBlogPost(fname);

  return { props: { post }, revalidate: 3600 };
};

const BlogPage: React.FC<BlogPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>

      <div className="h-full max-w-full overflow-y-auto  p-8 border-2 rounded scroll-auto border-light-yellow dark:border-dark-yellow prose prose-invert">
        <MDXRemote {...post.content} />
      </div>
    </>
  );
};

export default BlogPage;
