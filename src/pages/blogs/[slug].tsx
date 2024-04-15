import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BlogPostData, getBlogSlugs, getBlogData } from '../../utils/blogs'; // Adjust path as needed
import 'highlight.js/styles/base16/gruvbox-dark-hard.min.css';
import Head from 'next/head';
// import styles from '../../styles/blog.module.css';
// import codehl from '../../styles/prism-gruvbox-dark.module.css';

interface BlogPageProps {
  blogData: BlogPostData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogData = await getBlogData(params?.slug as string);
  return { props: { blogData } };
};

const BlogPage: React.FC<BlogPageProps> = ({ blogData }) => {
  return (
    <>
      <Head>
        <title>{blogData.data.title}</title>
      </Head>

      <div className="h-full max-w-full overflow-y-auto  p-8  border-2 rounded border-light-yellow dark:border-dark-yellow prose prose-invert">
        <MDXRemote {...blogData.content} />
      </div>
      <div className="align-right">RTHis is s a test </div>
    </>
  );
};

export default BlogPage;
