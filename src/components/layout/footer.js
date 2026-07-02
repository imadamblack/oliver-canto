import Link from 'next/link';
import { info } from '@info';
import { content } from '@content';

export default function Footer() {
  return (
    <footer className="bg-brand-4 text-white border-t border-white/10">
      <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Brand */}
        <div>
          <p className="font-black ft-1 tracking-tight">{info.companyName}</p>
          <p className="text-white/60 -ft-3 mt-1">{content.footer.tagline}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 -ft-2 text-white/60">
          <Link href={info.privacyNotice}>
            <a className="hover:text-white transition-colors">Aviso de privacidad</a>
          </Link>
          {info.social.facebook && (
            <a href={info.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Facebook
            </a>
          )}
          {info.social.instagram && (
            <a href={info.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
          )}
        </div>

        {/* Copy */}
        <p className="text-white/40 -ft-3">
          © {new Date().getFullYear()} {info.companyName}
        </p>
      </div>
    </footer>
  );
}
