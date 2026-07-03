'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import { motion, AnimatePresence } from 'framer-motion';
import { info } from '../../info';
import { normalizeWhatsapp } from '@/utils/formValidators';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const iconPaths = {
  globe:         "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  shield:        "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  lock:          "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  cpu:           "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
  layers:        "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
  server:        "M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0A2.25 2.25 0 0021.75 15v-1.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 13.5V15a2.25 2.25 0 002.25 2.25m15 0H4.5m15-11.25v.75A2.25 2.25 0 0117.25 9H6.75A2.25 2.25 0 014.5 6.75V6m17.25 0A2.25 2.25 0 0019.5 3.75H4.5A2.25 2.25 0 002.25 6m19.5 0H2.25",
  'shield-check':"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  arrow:         "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
  chevronDown:   "M19.5 8.25l-7.5 7.5-7.5-7.5",
  quote:         null, // uses fill variant below
  check:         "M4.5 12.75l6 6 9-13.5",
};

export const Icon = ({ name, className = 'w-5 h-5' }) => {
  if (name === 'quote') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
    );
  }
  const d = iconPaths[name];
  if (!d) return null;
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
};

/* ─────────────────────────────────────────
   CONFIG
   Actualiza estos valores por proyecto.
───────────────────────────────────────── */
const WHATSAPP_URL    = `https://wa.me/${info.whatsapp.value}`;

/* ─────────────────────────────────────────
   LÓGICA DE CALIFICACIÓN
   Recibe el objeto `data` del formulario y
   devuelve 'qualified' o 'nurture'.
───────────────────────────────────────── */
function qualifyLead(data) {
  const { project_stage, investment_range, decision_timing } = data;

  // 🟡 NUTRIR — sin intención clara o sin presupuesto
  const isExploring   = project_stage === 'exploring';
  const lowBudget     = investment_range === 'less-than-25k';
  const noDateNoBudget =
    (investment_range === 'undefined') && (decision_timing === 'no-date');

  if (isExploring || lowBudget || noDateNoBudget) return 'nurture';

  // 🟢 CALIFICADO — todo lo demás
  return 'qualified';
}

/* ─────────────────────────────────────────
   MENSAJE PRE-CARGADO PARA WHATSAPP
───────────────────────────────────────── */
function buildWhatsappMessage(data) {
  const stageMap = {
    'idea':      'Solo tengo la idea, quiero desarrollarla',
    'in-build':  'Ya tengo local o estoy en obra',
    'operating': 'Ya estoy operando y quiero mejorar',
  };
  const typeMap = {
    'cafe':        'Cafetería',
    'restaurant':  'Restaurante',
    'bar':         'Bar',
    'fine-dining': 'Fine dining / alta cocina',
    'other':       'Otro (food truck, dark kitchen, etc.)',
  };
  const investMap = {
    'less-than-25k': 'Menos de $25,000',
    '25k-70k':       '$25,000 – $70,000',
    '70k-150k':      '$70,000 – $150,000',
    'more-than-150k': 'Más de $150,000',
    'undefined':     'Aún no lo defino',
  };
  const timingMap = {
    'asap':     'Lo antes posible (próximos 3 meses)',
    '6-months': 'En los próximos 6 meses',
    'this-year': 'Este año',
    'no-date':  'Aún sin fecha definida',
  };

  const lines = [
    `Hola Chef Oliver 👋 Hice el diagnóstico en tu página.`,
    ``,
    `Soy: ${data.fullName}`,
    `Proyecto: ${typeMap[data.project_type] ?? data.project_type} en ${data.location}`,
    `Etapa: ${stageMap[data.project_stage] ?? data.project_stage}`,
    `Inversión contemplada: ${investMap[data.investment_range] ?? data.investment_range}`,
    `Quiero abrir/tenerlo listo: ${timingMap[data.decision_timing] ?? data.decision_timing}`,
  ];

  if (data.idea?.trim()) {
    lines.push(``, `Mi idea: ${data.idea.trim()}`);
  }

  return encodeURIComponent(lines.join('\n'));
}

/* ─────────────────────────────────────────
   FADE-IN HOOK
   No modificar.
───────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className = '', delay = 0 }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   INTRO
───────────────────────────────────────── */
const Intro = ({ onButtonClick }) => (
  <motion.div
    key="intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="relative h-[100dvh] flex flex-col md:justify-center overflow-hidden"
  >
    <section
      className="h-[100dvh] py-20 relative overflow-hidden z-0"
      style={{ backgroundColor: '#1a0a00' }}
    >
      {/* Textura de fondo */}
      <div
        className="absolute inset-0 opacity-[0.05] z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a00] via-[#1a0a00]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[url('/00.jpg')] bg-cover bg-center pointer-events-none -z-10" />

      <div className="container flex flex-col mx-auto relative h-full z-10">
        <div className="max-w-2xl flex flex-col flex-grow">

          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-3 -ft-4 font-semibold tracking-widest uppercase bg-white/10 text-amber-200 border border-white/10 px-6 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Consultoría gastronómica
            </span>
          </div>

          {/* Headline */}
          <h1 className="ft-5 font-black text-white tracking-tight mb-5">
            Diseño el restaurante que tienes en la cabeza. Y el negocio que lo sostiene.
          </h1>

          {/* Subtítulo */}
          <p className="ft-1 text-neutral-200 mb-8 leading-relaxed flex-grow">
            Diseño tu concepto, tu carta, tu cocina y el negocio rentable que casi nadie ve detrás de una buena idea.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="button !bg-brand-5 border border-[#1a0a00] ft-1 shadow-2xl"
              style={{animation: "bounce 1s 2.5"}}
              onClick={() => onButtonClick(false)}
            >
              Tu primera sesión gratuita
              <Icon name="arrow" className="w-8 h-8" />
            </a>
          </div>

        </div>
      </div>
    </section>
  </motion.div>
);

/* ─────────────────────────────────────────
   FORM STEPS
───────────────────────────────────────── */
const formSteps = () => ([

  // P1 — Etapa del proyecto
  {
    type: 'radio',
    name: 'project_stage',
    eyebrow: 'Tu proyecto',
    title: '¿En qué etapa está tu proyecto?',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      {
        value: 'idea',
        label: '🌱 Solo tengo la idea',
        sub: 'Quiero desarrollarla desde cero',
      },
      {
        value: 'in-build',
        label: '🏗️ Ya tengo local o estoy en obra',
        sub: 'El proyecto ya está en marcha',
      },
      {
        value: 'operating',
        label: '🍳 Ya estoy operando',
        sub: 'Quiero mejorar lo que tenemos',
      },
    ],
    cols: 1,
  },

  // CHECKPOINT — prueba social entre P1 y P2
  {
    type: 'checkpoint',
    name: 'checkpoint-social-proof',
    render: () => (
      <div className="relative flex-grow px-2 py-4">
        <p className="-ft-3 font-bold text-amber-600 mb-3">
          Lo que dicen quienes ya trabajaron conmigo
        </p>
        <p className="ft-2 font-bold text-gray-900 mb-8">
          Una buena receta no salva un mal concepto
        </p>
        <div className="flex flex-col gap-4">
          {[
            {
              quote: 'Pensé que solo necesitaba recetas. Chef Oliver me mostró lo que mi concepto le faltaba y lo que podía ganar. Terminamos con algo muy distinto, y mucho mejor.',
              name: 'Ana Luisa',
              city: 'CDMX',
            },
            {
              quote: 'Me explicaba el porqué de cada decisión. Hoy entiendo mi negocio de una forma que antes no tenía.',
              name: 'Mateo Villanueva',
              city: 'Puebla',
            },
            {
              quote: 'Creamos un menú espectacular y además el Chef Oliver me dio muchos tips para arrancar al 100 con mi restaurante italiano.',
              name: 'Santiago Martínez',
              city: 'Mérida',
            },
          ].map((t) => (
            <div key={t.name} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-gray-700 -ft-1 leading-relaxed mb-3">"{t.quote}"</p>
              <p className="-ft-3 font-semibold text-gray-500">{t.name} · {t.city}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // P2 — Tipo de proyecto
  {
    type: 'radio',
    name: 'project_type',
    eyebrow: 'Tu concepto',
    title: '¿Qué tipo de lugar es (o será)?',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'cafe',        label: '☕ Cafetería' },
      { value: 'restaurant',  label: '🍽️ Restaurante' },
      { value: 'bar',         label: '🍸 Bar' },
      { value: 'fine-dining', label: '✨ Fine dining / alta cocina' },
      { value: 'other',       label: '🚚 Otro', sub: 'Food truck, dark kitchen, etc.' },
    ],
    cols: 1,
  },

  // CHECKPOINT — qué revisamos (después de P2, cuando ya conocemos el tipo de proyecto)
  {
    type: 'checkpoint',
    name: 'checkpoint-que-revisamos',
    render: () => (
      <div className="relative flex-grow px-2 py-4">
        <p className="-ft-3 font-bold tracking-widest uppercase text-amber-600 mb-3">
          Cómo trabajamos
        </p>
        <p className="ft-2 font-bold text-gray-900 mb-2">
          No es el menú que traes en la cabeza...
        </p>
        <p className="text-gray-500 ft-0 mb-8">
          Es lo que hay detrás de cada platillo. Antes de proponerte un solo platillo, revisamos esto:
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: '🎯',
              label: 'Concepto',
              desc: '¿Tienes diferenciación real, o te pareces a diez lugares que ya existen?',
            },
            {
              icon: '🧾',
              label: 'Costeo',
              desc: '¿Sabes cuánto te cuesta cada platillo y si tu precio lo sostiene?',
            },
            {
              icon: '⚙️',
              label: 'Operación',
              desc: '¿Tu cocina está diseñada para tu servicio, o para lo que cupo en el espacio?',
            },
            {
              icon: '👥',
              label: 'Equipo',
              desc: '¿Pueden ejecutar tu concepto sin que estés encima todo el tiempo?',
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 items-start bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <span className="ft-0 leading-none mt-0.5">{item.icon}</span>
              <div>
                <p className="font-bold text-gray-900 ft-0">{item.label}</p>
                <p className="text-gray-500 -ft-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // P3 — Ciudad
  {
    type: 'radio',
    name: 'city',
    eyebrow: 'Tu plaza',
    title: '¿Dónde está (o estará) tu proyecto?',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      { value: 'cdmx', label: 'CDMX' },
      { value: 'puebla', label: 'Puebla' },
      { value: 'guadalajara', label: 'Guadalajara' },
      { value: 'merida', label: 'Mérida' },
      { value: 'queretaro', label: 'Querétaro' },
      { value: 'otro', label: 'Otra ciudad' },
    ],
    cols: 1,
  },

  // P4 — Área
  {
    type: 'text',
    name: 'area',
    eyebrow: 'Tu plaza',
    title: '¿En qué zona?',
    placeholder: 'Ej: Puebla Centro, Polanco, Monterrey...',
    inputOptions: { required: 'Escribe tu zona o colonia' },
  },

  // P5 — Tiempo
  {
    type: 'radio',
    name: 'decision_timing',
    eyebrow: 'Tu tiempo',
    title: '¿Para cuándo te gustaría tenerlo listo o abrir?',
    inputOptions: { required: 'Selecciona una opción' },
    options: [
      {
        value: 'asap',
        label: '🔴 Lo antes posible',
        sub: 'Próximos 3 meses',
      },
      {
        value: '6-months',
        label: '🟡 En los próximos 6 meses',
      },
      {
        value: 'this-year',
        label: '🟢 Este año',
      },
      {
        value: 'no-date',
        label: '⚪ Aún sin fecha definida',
      },
    ],
    cols: 1,
  },

  // P6 — Opt-in (captura de contacto)
  {
    type: 'opt-in',
    title: '¿A dónde te contacta Chef Oliver?',
    description: 'Con esto armamos tu perfil antes de la llamada, no tendrás que repetir nada.',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Nombre completo',
        inputOptions: { required: 'Escribe tu nombre' },
      },
      {
        type: 'text',
        name: 'email',
        title: 'Correo electrónico',
        inputOptions: { required: 'Escribe tu correo' },
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'WhatsApp',
        inputOptions: {
          required: 'Escribe tu número de WhatsApp',
          maxLength: { value: 10, message: 'Escribe un número de 10 dígitos' },
          minLength: { value: 10, message: 'Escribe un número de 10 dígitos' },
        },
      },
    ],
  },
]);

/* ─────────────────────────────────────────
   PAGE — LÓGICA PRINCIPAL
───────────────────────────────────────── */
export default function Survey({ lead, utm }) {
  const [showIntro, setShowIntro]   = useState(true);
  const [showOutro, setShowOutro]   = useState(false);
  const [formStep, setFormStep]     = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending]       = useState(false);

  const methods = useForm({ mode: 'all' });
  const { register, handleSubmit, formState: { errors } } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(true), 6000);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  const steps = formSteps();

  useEffect(() => {
    const current = steps[formStep];
    if (current?.autoAdvance) {
      const timer = setTimeout(
        () => setFormStep((prev) => Math.min(prev + 1, steps.length - 1)),
        5000,
      );
      return () => clearTimeout(timer);
    }
  }, [formStep]);

  useEffect(() => {
    const step = steps[formStep];
    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
    }
  }, [formStep]);

  const lastInputIndex = steps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);

  const getStepFieldNames = (step) => {
    if (!step) return [];
    if (step.type === 'opt-in') return step.fields.map((f) => f.name);
    if (step.name) return [step.name];
    return [];
  };

  const requiredContactFields = ['fullName', 'email', 'phone'];

  const handlePrimaryButtonClick = async () => {
    if (sending) return;

    const currentStep = steps[formStep];
    const fieldNames  = getStepFieldNames(currentStep);

    const currentStepIsValid = await methods.trigger(fieldNames, { shouldFocus: true });
    if (!currentStepIsValid) { setInputError(formStep); return; }

    if (formStep !== lastInputIndex) {
      setInputError(null);
      window.scrollTo(0, 0);
      setFormStep((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    const contactIsValid = await methods.trigger(requiredContactFields, { shouldFocus: true });
    if (!contactIsValid) { setInputError(formStep); return; }

    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    const fullName = data.fullName?.trim();
    const email    = data.email?.trim();
    const phone    = normalizeWhatsapp(data.phone?.trim());

    if (!fullName || !email || !phone) {
      await methods.trigger(['fullName', 'email', 'phone'], { shouldFocus: true });
      return;
    }

    setSending(true);

    try {
      data.dateAdded = Date.now();

      // Calificar el lead antes de enviar
      // const leadType = qualifyLead(data);
      const leadType = 'qualified';

      const payload = {
        ...lead,
        ...data,
        ...utm,
        fullName,
        email,
        phone,
        leadType, // 'qualified' | 'nurture'
      };

      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(`Webhook error: ${res.status}`);

      const result = await res.json().catch(() => ({}));

      fbEvent('Lead', { phone, externalID: result.id, leadType });
      setCookie('lead', { ...data, id: result.id, leadType });

      // Ruteo según calificación
      if (leadType === 'qualified') {
        await router.push(`/thankyou`);
      } else {
        await router.push('/thankyou?lead=nurture');
      }

    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-grow bg-gradient-to-t from-amber-50 to-white">
      <AnimatePresence mode="wait">
        {showIntro && <Intro onButtonClick={setShowIntro} />}

        {!showIntro && !showOutro && (
          <motion.div
            key="survey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-grow pb-[8rem]"
          >
            {/* Barra de progreso */}
            <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
              <div className="relative bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-amber-500 transition-all duration-500"
                  style={{ width: `${((formStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
              <div className="survey-card">
                <FormProvider {...methods}>
                  <form
                    className="flex flex-col flex-grow"
                    onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={formStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        <StepRenderer
                          step={steps[formStep]}
                          index={formStep}
                          currentStep={formStep}
                          errors={errors}
                          inputError={inputError}
                          errorMessage={errors[steps[formStep]?.name]?.message}
                          register={register}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Botones de navegación */}
                    <div className={`fixed p-8 bottom-0 inset-x-0 grid ${steps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                      {steps[formStep].type !== 'checkpoint' && (
                        <button
                          type="button"
                          onClick={() => setFormStep(formStep - 1)}
                          className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                          disabled={formStep <= 0}
                        >
                          Atrás
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={sending}
                        onClick={handlePrimaryButtonClick}
                        className="mt-auto !w-full"
                      >
                        {sending && <span className="animate-spin mr-4">+</span>}
                        {formStep === lastInputIndex ? 'Enviar' : 'Continuar'}
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVER SIDE PROPS
   No modificar. Lee UTM y cookies del lead.
───────────────────────────────────────── */
export async function getServerSideProps(ctx) {
  const { req, query } = ctx;
  const cookiesHeader = req.headers.cookie || '';
  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];
    if (!raw) continue;
    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  const utm = Object.keys(utmFromQuery).length > 0 ? utmFromQuery : cookies.utm ?? null;
  const { lead } = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone:    lead?.phone    ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm,
    },
  };
}