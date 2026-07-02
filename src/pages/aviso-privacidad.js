import { info } from '@info';

export default function AvisoPrivacidad() {
  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <h1 className="ft-7 font-black text-brand-1 mb-8">Aviso de Privacidad</h1>

        <div className="space-y-6 ft-0 text-neutral-700 leading-relaxed">
          <p>
            <strong>{info.legalName}</strong> (en adelante "la Empresa"), con domicilio en{' '}
            {info.address.address ? `${info.address.address}, ${info.address.col}, ${info.address.cp} ${info.address.city}, ${info.address.state}` : '[domicilio]'},
            es responsable del tratamiento de sus datos personales.
          </p>

          <h2 className="ft-3 font-bold text-brand-1 mt-8">¿Para qué fines usamos sus datos?</h2>
          <p>
            Los datos personales que recabamos serán utilizados para las siguientes finalidades:
          </p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Brindarle información sobre nuestros productos y/o servicios.</li>
            <li>Contactarle para dar seguimiento a su solicitud de información.</li>
            <li>Enviar comunicaciones comerciales y promocionales.</li>
          </ul>

          <h2 className="ft-3 font-bold text-brand-1 mt-8">¿Qué datos recabamos?</h2>
          <p>Nombre completo, número de teléfono/WhatsApp y correo electrónico.</p>

          <h2 className="ft-3 font-bold text-brand-1 mt-8">¿Con quién compartimos sus datos?</h2>
          <p>
            Sus datos no serán transferidos a terceros sin su consentimiento, salvo por las
            excepciones previstas en la Ley Federal de Protección de Datos Personales en Posesión
            de los Particulares.
          </p>

          <h2 className="ft-3 font-bold text-brand-1 mt-8">Derechos ARCO</h2>
          <p>
            Puede ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO)
            enviando un correo a{' '}
            <a href={`mailto:${info.email.recipients[0]}`} className="underline text-brand-1">
              {info.email.recipients[0]}
            </a>.
          </p>

          <p className="-ft-2 text-neutral-400 mt-12">
            Última actualización: {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
