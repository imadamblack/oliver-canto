import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { info } from '@info';
import { content } from '@content';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" passHref>
            <a className="relative block w-40 h-12">
              {/* Replace with <Image src="/logo.png" layout="fill" objectFit="contain" alt={info.companyName} /> */}
              <span className="font-black ft-3 text-brand-1 tracking-tight">
                {info.companyName}
              </span>
            </a>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="-ft-1 font-medium text-neutral-600 hover:text-brand-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact">
              <button className="!py-3 !px-6 -ft-1">{content.nav.cta}</button>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden !bg-transparent !text-brand-1 !p-2 !w-auto border-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="-ft-1 font-medium text-neutral-700 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              <button className="w-full !py-3 -ft-1">{content.nav.cta}</button>
            </a>
          </div>
        )}
      </header>

      {/* Optional promo bar */}
      {info.promoBar && (
        <div className="bg-brand-2 w-full text-white py-3 px-4 sticky top-20 z-40">
          <p className="-ft-2 font-semibold text-center">{info.promoBar}</p>
        </div>
      )}
    </>
  );
}
