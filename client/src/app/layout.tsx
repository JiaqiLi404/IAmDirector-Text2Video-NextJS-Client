import './globals.css';
import '../styles/layout.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IAmDirector视频创作平台',
  description: 'I Am Director',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className} style={{ background: 'rgb(243 244 246 )' }}>
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>
  );
}
