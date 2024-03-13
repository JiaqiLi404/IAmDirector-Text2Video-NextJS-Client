'use server';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // If no authentication token in cookies is found, redirect to the login page
  if (!request.cookies.get('token')) {
    let url_list=request.url.split('//')[1].split('/')
    let url=url_list.slice(1,url_list.length).join('/')
    console.log(url)
    return NextResponse.redirect(new URL(`/login?redirect=${url}`, request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/account/:path*','/director/:path*', '/editor/:path*'],
}