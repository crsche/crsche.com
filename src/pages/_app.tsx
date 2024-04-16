import React from 'react';
import '../styles/global.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from 'next/head';
import 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width"
          key="viewport"
          inital-scale="1.0"
        />
      </Head>
      <NextSeo
        title="conor."
        description="conor scheidt\'s personal website"
        openGraph={{
          title: 'conor.',
          description: "conor scheidt's personal website",
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
