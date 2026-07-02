import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { emailRegExp, normalizeWhatsapp, restrictNumber } from '@/utils/formValidators';
import fbEvent, { gtagSendEvent } from '@/services/fbEvents';
import { info } from '@info';

// ─── Basic opt-in form (name + phone).
// For a richer form add more fields — see doble-acento's opt-in-form for reference.

export default function OptInForm({ lastClick = '', utm = {} }) {
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const methods = useForm({ mode: 'all' });
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    setSending(true);
    data.whatsapp = normalizeWhatsapp(data.phone);
    data.origin = info.companyName + ' Landing';
    data.lastClick = lastClick;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = { ...data, _fbc, _fbp, ...utm };

    try {
      const result = await fetch(info.optInWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      const { id } = await result.json();
      fbEvent('Lead', { phone: data.phone, email: data.email, externalID: id });
      // gtagSendEvent('CONVERSION_ID', { fullName: data.fullName, phone: data.whatsapp });
      setCookie('lead', { ...data, id });
    } catch {
      fbEvent('Lead', { phone: data.phone, email: data.email, externalID: '' });
      setCookie('lead', { ...data });
    } finally {
      router.push('/thankyou');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="contact"
        className="flex flex-col w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('fullName', { required: 'Escribe tu nombre' })}
          className={errors.fullName ? '!border-brand-3' : ''}
          placeholder="Nombre completo"
        />
        {errors.fullName && (
          <p className="-ft-2 text-brand-3">{errors.fullName.message}</p>
        )}

        <input
          {...register('phone', {
            required: 'Escribe tu WhatsApp',
            maxLength: { value: 10, message: 'Ingresa 10 dígitos' },
            minLength: { value: 10, message: 'Ingresa 10 dígitos' },
          })}
          className={errors.phone ? '!border-brand-3' : ''}
          onKeyDown={restrictNumber}
          placeholder="WhatsApp (10 dígitos)"
        />
        {errors.phone && (
          <p className="-ft-2 text-brand-3">{errors.phone.message}</p>
        )}

        <input
          {...register('email', {
            pattern: { value: emailRegExp, message: 'Revisa tu correo' },
          })}
          className={errors.email ? '!border-brand-3' : ''}
          placeholder="Correo electrónico (opcional)"
        />
        {errors.email && (
          <p className="-ft-2 text-brand-3">{errors.email.message}</p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full mt-2"
        >
          {sending
            ? <span className="animate-spin inline-block mr-2">⟳</span>
            : null
          }
          {sending ? 'Enviando...' : info.whatsapp.value ? 'Enviar →' : 'Solicitar información →'}
        </button>

        <p className="-ft-3 text-center text-neutral-500 mt-2">
          No compartiremos tus datos. Al dar clic aceptas nuestra&nbsp;
          <Link href={info.privacyNotice}>
            <a className="underline hover:text-brand-1">política de privacidad</a>
          </Link>.
        </p>
      </form>
    </FormProvider>
  );
}
