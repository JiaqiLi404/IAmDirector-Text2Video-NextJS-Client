import Head, { HeadProps } from './Head';
import MainHeader from './Header';
import React, { PropsWithChildren, HTMLAttributes } from 'react';
import Footer from './Footer';
import { App } from 'antd';

type PageProps = PropsWithChildren<HeadProps> &
  HTMLAttributes<HTMLDivElement> & {
  mainClassName?: string;
};

const Page = (props: PageProps, subtitle: string) => (
  <>
    <Head {...props} subtitle={subtitle}>
    </Head>
    <MainHeader />
    <main className={' items-center justify-center bg-gray-100'}>
      <App>
        <div className={'container h-full mx-auto py-16 ' + props.className} style={{ minHeight: '80rem',...props.style }}>
          {/*<p>{props.style}</p>*/}
          {props.children}
        </div>
      </App>
    </main>
    <Footer />
  </>
);

export default Page;
