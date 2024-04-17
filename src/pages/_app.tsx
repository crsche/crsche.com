import React from 'react';
import '../styles/global.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from 'next/head';
import 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
import config from '../../config.json';
import Maintenance from '../components/maintenance';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  if (process.env.NEXT_PUBLIC_MAINTENANCE === 'true') {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Maintenance />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width"
          key="viewport"
          inital-scale="1.0"
        />
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords} />
        <meta name="robots" content="all" />
        <meta name="author" content={config.name} />
      </Head>
      <NextSeo
        title={config.title}
        description={config.description}
        openGraph={{
          title: config.title,
          description: config.description,
          images: [
            {
              url: '/assets/preview.png',
              width: 3024,
              height: 1648,
              alt: 'preview',
            },
          ],
        }}
      />

      <main className="dark:bg-dark-background bg-light-background md:text-base text-light-foreground dark:text-dark-foreground p-2 h-full">
        <SpeedInsights />
        <Analytics />
        <Component {...pageProps} inputRef={inputRef} />
      </main>
    </>
  );
};

export default App;
