'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { info } from '../../info';

const Eyebrow = ({ children, colorClass = 'text-amber-600' }) => (
  <p className={`-ft-4 font-bold tracking-[0.2em] uppercase mb-3 ${colorClass}`}>
    {children}
  </p>
);

const Divider = () => (
  <div className="w-8 h-px bg-amber-600 opacity-40 mx-auto my-8" />
);

const QualifiedBlock = () => (
  <div className="bg-white border border-[#F3E8D0] rounded-[1.25rem] p-8 text-center">
    <Eyebrow>Siguiente paso</Eyebrow>
    <h4 className="text-[#1C1410] mb-2">
      Listo para platicar!
    </h4>
    <p className="-ft-1 text-stone-500 mb-6 leading-relaxed">
      Chef Oliver ya recibió tu diagnóstico. Escríbele directo, el mensaje lleva todo tu contexto para que no tengas que repetir nada.
    </p>
    <a
      href={`https://wa.me/${info.whatsapp.value}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-600 text-white font-bold -ft-1 px-7 py-3.5 rounded-xl no-underline hover:opacity-90 transition-opacity"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Escribirle a Chef Oliver
    </a>
    <p className="-ft-3 text-stone-400 mt-4">
      También puedes esperar, te contactará en menos de 24 horas.
    </p>
  </div>
);

const NurtureBlock = () => (
  <div className="bg-white border border-[#F3E8D0] rounded-[1.25rem] p-8 text-center">
    <Eyebrow>Lo que sigue</Eyebrow>
    <h4 className="text-[#1C1410] mb-2">
      Tu proyecto va tomando forma.
    </h4>
    <p className="-ft-1 text-stone-500 mb-6 leading-relaxed">
      Te vamos a mandar material que te va a servir para llegar más listo. Cuando estés en punto de arrancar, platicamos.
    </p>
    <div className="flex flex-col gap-3 text-left mb-6">
      {[
        { icon: '📬', text: 'Revisa tu correo — te llega una guía de Chef Oliver en los próximos minutos.' },
        { icon: '📲', text: 'Síguelo en Instagram para ver el proceso real detrás de cada proyecto.' },
        { icon: '📅', text: 'Cuando tengas más claridad, regresa y agenda tu primera sesión gratuita.' },
      ].map((item) => (
        <div key={item.text} className="flex gap-3 items-start bg-[#FDFAF5] rounded-xl p-3.5">
          <span className="ft-0 leading-none mt-0.5">{item.icon}</span>
          <p className="-ft-2 text-stone-600 leading-snug m-0">{item.text}</p>
        </div>
      ))}
    </div>
    <a
      href="https://instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-amber-600 font-bold -ft-1 px-6 py-3 rounded-xl border border-amber-600 no-underline hover:bg-amber-600 hover:text-white transition-all"
    >
      Seguir a Chef Oliver
    </a>
  </div>
);

const Pillars = () => (
  <div>
    <Eyebrow colorClass="text-stone-400">Lo que construimos juntos</Eyebrow>
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { label: 'Concepto',  icon: '🎯' },
        { label: 'Costeo',    icon: '🧾' },
        { label: 'Operación', icon: '⚙️' },
        { label: 'Equipo',    icon: '👥' },
      ].map((p) => (
        <div key={p.label} className="flex items-center gap-2.5 bg-white border border-[#F3E8D0] rounded-xl px-4 py-3">
          <span className="ft-0">{p.icon}</span>
          <span className="-ft-2 font-semibold text-[#1C1410]">{p.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function ThankYou() {
  const router = useRouter();
  const [leadType, setLeadType] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fromQuery = router.query.lead;
    const cookie = getCookie('lead');
    const parsed = typeof cookie === 'string' ? JSON.parse(cookie) : cookie;

    setLeadType(fromQuery ?? parsed?.leadType ?? 'nurture');
    setName(parsed?.fullName?.split(' ')[0] ?? '');
  }, [router.query]);

  if (!leadType) return (
    <div className="min-h-[100dvh] bg-[#FDFAF5]" />
  );

  const isQualified = leadType === 'qualified';

  return (
    <div className="min-h-[100dvh] bg-[#FDFAF5] flex flex-col items-center justify-start pt-12 px-5 pb-20">
      <div className="w-full max-w-[480px]">

        <div className="text-center mb-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 ft-0 ${isQualified ? 'bg-green-100' : 'bg-amber-100'}`}>
            {isQualified ? '✓' : '📩'}
          </div>

          <Eyebrow colorClass={isQualified ? 'text-green-600' : 'text-amber-600'}>
            {isQualified ? 'Diagnóstico recibido' : 'Todo listo'}
          </Eyebrow>

          <h1 className="ft-4 font-bold font-serif italic text-[#1C1410] mb-4">
            {isQualified
              ? (name ? `${name}, tu proyecto encaja.` : 'Tu proyecto encaja.')
              : 'Recibido. Nos vemos cuando estés listo.'}
          </h1>

          <p className="-ft-1 text-stone-500 leading-relaxed m-0">
            {isQualified
              ? 'Respondiste lo que necesitaba saber. El siguiente paso es una conversación, no una cotización.'
              : 'Guardamos tu diagnóstico. Cuando tu proyecto esté listo para arrancar, Chef Oliver estará aquí.'}
          </p>
        </div>

        <QualifiedBlock />
        {/*{isQualified ? <QualifiedBlock /> : <NurtureBlock />}*/}

        <Divider />

        <Pillars />

        <div className="mt-10 text-center border-t border-stone-200 pt-6">
          <p className="-ft-1 font-serif italic text-stone-400">
            Chef Oliver · Consultoría gastronómica de autor
          </p>
          <p className="-ft-3 text-[#C4BEB9] mt-1">
            Puebla · CDMX
          </p>
        </div>

      </div>
    </div>
  );
}