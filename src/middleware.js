import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  let utm = req.cookies.get('utm') ? JSON.parse(req.cookies.get('utm')) : {};
  const _fbc = req.cookies.get('_fbc')?.value;

  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  if (!_fbc && url.searchParams.get('fbclid')) {
    res.cookies.set(
      '_fbc',
      `fb.1.${Date.now()}.${url.searchParams.get('fbclid')}`,
      { path: '/', maxAge: 60 * 60 * 24 * 7 },
    );
  }

  utmParams.forEach(param => {
    const value = url.searchParams.get(param);
    if (value) utm = { ...utm, [param]: value };
  });

  res.cookies.set('utm', JSON.stringify(utm), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}

export const config = {
  matcher: ['/', '/survey'],
};
