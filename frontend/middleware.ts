import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Zistíme, či má používateľ v cookies uložený token
  // Poznámka: LocalStorage v middleware nefunguje (beží na serveri), 
  // preto budeme musieť v ďalšom kroku ukladať token do Cookies.
  const token = request.cookies.get('token')?.value;

  // 2. Ak ide na dashboard a NEMÁ token, pošleme ho na login
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// 3. Povieme Next.js, na ktoré cesty sa má tento vyhadzovač pozerať
export const config = {
  matcher: ['/dashboard/:path*'],
};