import NextHead from 'next/head';
import { usePathname } from 'next/navigation';

const rootURL = process.env.NEXT_PUBLIC_ROOT_URL;
const defaultDescription = 'Full-featured template for next.js applications.';
const defaultOGImage = rootURL + '/static/og-image.png';
const defaultTitle = process.env.NEXT_PUBLIC_APP_TITLE;

export interface HeadProps {
  description?: string;
  ogImage?: string;
  title?: string;
  url?: string;
  subtitle: string;
}

const Head = (props: HeadProps) => {
  const pathname = usePathname();
  const defaultOGURL = rootURL + pathname;

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{`${props.title} - ${props.subtitle}` || defaultTitle}</title>
      <meta name="description" content={props.description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={`${props.title}` || defaultTitle} />
      <meta property="og:description" content={props.description || defaultDescription} />
      {/*<meta name="twitter:site" content={props.url || defaultOGURL} />*/}
      {/*<meta name="twitter:card" content="summary_large_image" />*/}
      {/*<meta name="twitter:image" content={props.ogImage || defaultOGImage} />*/}
      {/*<meta property="og:image" content={props.ogImage || defaultOGImage} />*/}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7864070218646953"
              crossOrigin="anonymous"></script>
    </NextHead>
  );
};

export default Head;
