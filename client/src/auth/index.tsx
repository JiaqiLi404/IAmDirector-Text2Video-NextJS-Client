'use client';

import React, { HTMLAttributes, JSX, PropsWithChildren, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { loadCookies, removeCookies, saveCookies } from '@/store/cookies';


type PageProps = HTMLAttributes<HTMLDivElement> & {
  mainClassName?: string;
};

export function Auth(props: PageProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    // setMounted(true);
    // if (getToken() == undefined) {
    //   router.push('/login?redirect=' + pathName);
    // }
  }, []);

  if (!mounted) {
  }

  // if (getToken() == undefined) {
  //   router.push('/login?redirect=' + pathName);
  //   return null;
  // }


  return (<>{props.children}</>);
}

export function getToken() {
  return loadCookies('token');
}

export function setToken(token: string) {
  saveCookies('token', token);
}

export function removeToken() {
  removeCookies('token');
}

export function getLoginInfo() {
  return loadCookies('token');
}

export function setLoginInfo(info: any) {
  saveCookies('token', info);
}
