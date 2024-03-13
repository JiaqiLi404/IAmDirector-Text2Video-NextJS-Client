import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { UrlObject } from 'url';
import { Button } from 'antd';

const routes = [
  { href: '/home', label: '主页', type: 'route' },
  { href: '/examples', label: '我们能做', type: 'route' },
  { href: '/home#contact-div', label: '联系我们', type: 'route' },
  { href: '/account', label: '账户', type: 'route' },
  { href: '/director', label: '开始创作', type: 'button' },

];

function decideRouteComponent(route: { type: string; href: string; label: string; }, pathname: string) {
  if (route.type === 'scroll') {
    return (<a href={`#${route.href}`} className={`px-3 font-semibold hover:opacity-75 ${
      pathname === route.href ? 'text-primary-500' : ''
    }`}>
      {route.label}
    </a>);
  }
  if (route.type === 'button') {
    return (
      <Button type="primary" block size={'large'} href={route.href} className={'px-3 font-semibold header-console-btn'}>
        {route.label}
      </Button>);
  }
  return (<Link href={route.href} className={`px-3 font-semibold hover:opacity-75 ${
    pathname === route.href ? 'text-primary-500' : ''
  }`}>
    {route.label}
  </Link>);
}

function MainHeader() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <header className="absolute top-0 z-50 w-full bg-white shadow-lg">
      <nav className="container flex flex-wrap items-center justify-between px-2 py-3 mx-auto">
        <div className="relative flex justify-between w-full px-3 md:w-auto md:static md:block md:justify-start header">
          <Link href="/" className="inline-block py-2 text-lg font-bold">
            {process.env.NEXT_PUBLIC_APP_TITLE}
          </Link>
          <button
            className="px-3 py-1 text-xl outline-none md:hidden focus:outline-none"
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="block w-6 h-px bg-gray-700 rounded-sm"></span>
            <span className="block w-6 h-px mt-1 bg-gray-700 rounded-sm"></span>
            <span className="block w-6 h-px mt-1 bg-gray-700 rounded-sm"></span>
          </button>
        </div>
        <div
          className={`flex overflow-hidden md:overflow-visible transition-height duration-300 md:h-auto ${
            isCollapsed ? 'h-0' : 'h-48'
          } `}
          id="list-mobile"
        >
          <ul className="flex flex-col list-none md:flex-row">
            {routes.map(route => (
              <li className="py-1 text-left flex items-center" key={route.label}>
                {decideRouteComponent(route, pathname)}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
