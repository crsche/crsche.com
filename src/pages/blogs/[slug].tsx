import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BlogPost, getBlogPost } from '../../utils/blogs'; // Adjust path as needed
import 'highlight.js/styles/base16/gruvbox-dark-hard.min.css';
import Head from 'next/head';
import React from 'react';

// import styles from '../../styles/blog.module.css';
// import codehl from '../../styles/prism-gruvbox-dark.module.css';

// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
interface BlogPageProps {
  post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fname = `${slug}.mdx`;
  const post = await getBlogPost(fname);
  // eslint-disable-next-line no-console
  console.warn(`recached post: ${slug}`);

  return { props: { post }, revalidate: 3600 };
};

const BlogPage: React.FC<BlogPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>

      <div className="h-full max-w-full overflow-y-auto  p-8 border-2 rounded scroll-auto border-light-yellow dark:border-dark-yellow prose dark:prose-invert">
        <MDXRemote {...post.content} />
      </div>
    </>
  );
};

export default BlogPage;
