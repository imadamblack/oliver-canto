// ─── Page Content ─────────────────────────────────────────────────────────────
// All visible text for the landing page and survey lives here.
// Sections that are not needed can be set to null and removed from the page.

export const content = {
  // ── Navigation ────────────────────────────────────────────────────────────
  nav: {
    cta: "Contáctanos",
    links: [
      { label: "Beneficios", href: "#beneficios" },
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Testimonios", href: "#testimonios" },
      { label: "Preguntas", href: "#faq" },
    ],
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    banner: {
      // eyebrow: small label above the headline (optional)
      eyebrow: "Solución #1 para tu negocio",
      title: "El titular principal que define la propuesta de valor",
      subtitle: "frase que refuerza el headline",
      description:
        "Párrafo de apoyo que explica qué hace la empresa y para quién es. Máximo 2-3 líneas.",
    },
    cta: {
      main: "Solicita información",
      secondary: "Ver más",
    },
    // Optional stats strip below the CTA
    stats: [
      { value: "+500", label: "Clientes activos" },
      { value: "10 años", label: "De experiencia" },
      { value: "98%", label: "Satisfacción" },
    ],
  },

  // ── Beneficios ────────────────────────────────────────────────────────────
  beneficios: {
    banner: {
      eyebrow: "¿Por qué elegirnos?",
      title: "Todo lo que obtienes al trabajar con nosotros",
      description: "Descripción opcional de la sección de beneficios.",
    },
    items: [
      {
        icon: "shield-check",
        title: "Beneficio uno",
        description: "Descripción del beneficio uno.",
      },
      {
        icon: "layers",
        title: "Beneficio dos",
        description: "Descripción del beneficio dos.",
      },
      {
        icon: "server",
        title: "Beneficio tres",
        description: "Descripción del beneficio tres.",
      },
      {
        icon: "globe",
        title: "Beneficio cuatro",
        description: "Descripción del beneficio cuatro.",
      },
      {
        icon: "cpu",
        title: "Beneficio cinco",
        description: "Descripción del beneficio cinco.",
      },
      {
        icon: "lock",
        title: "Beneficio seis",
        description: "Descripción del beneficio seis.",
      },
    ],
    cta: "Quiero saber más",
  },

  // ── Cómo funciona / Atributos ─────────────────────────────────────────────
  atributos: {
    banner: {
      eyebrow: "Así funciona",
      title: "Así funciona nuestro proceso",
      description: "Descripción opcional del proceso.",
    },
    items: [
      {
        number: "01",
        title: "Primer paso",
        description: "Descripción del primer paso del proceso.",
      },
      {
        number: "02",
        title: "Segundo paso",
        description: "Descripción del segundo paso del proceso.",
      },
      {
        number: "03",
        title: "Tercer paso",
        description: "Descripción del tercer paso del proceso.",
      },
    ],
    cta: "Empezar ahora",
  },

  // ── Testimonios ───────────────────────────────────────────────────────────
  testimonios: {
    banner: {
      eyebrow: "Lo que dicen nuestros clientes",
      title: "Resultados reales de clientes reales",
    },
    items: [
      {
        quote: "Testimonio del cliente uno. Aquí va la cita completa.",
        author: "Nombre Apellido",
        company: "Empresa / Cargo",
      },
      {
        quote: "Testimonio del cliente dos. Aquí va la cita completa.",
        author: "Nombre Apellido",
        company: "Empresa / Cargo",
      },
      {
        quote: "Testimonio del cliente tres. Aquí va la cita completa.",
        author: "Nombre Apellido",
        company: "Empresa / Cargo",
      },
    ],
    cta: "Solicitar información",
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faqs: {
    banner: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas",
    },
    items: [
      {
        q: "¿Pregunta frecuente uno?",
        a: "Respuesta detallada a la pregunta uno.",
      },
      {
        q: "¿Pregunta frecuente dos?",
        a: "Respuesta detallada a la pregunta dos.",
      },
      {
        q: "¿Pregunta frecuente tres?",
        a: "Respuesta detallada a la pregunta tres.",
      },
      {
        q: "¿Pregunta frecuente cuatro?",
        a: "Respuesta detallada a la pregunta cuatro.",
      },
    ],
  },

  // ── CTA Final ─────────────────────────────────────────────────────────────
  cta: {
    title: "¿Listo para dar el siguiente paso?",
    description:
      "Descripción de apoyo para el CTA final. Una línea que motive la acción.",
    cta: "Solicitar información ahora",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "Descripción corta de la empresa",
  },

  // ── Survey ────────────────────────────────────────────────────────────────
  survey: {
    intro: {
      title: "En menos de un minuto sabremos cómo podemos ayudarte",
    },
    // The opt-in step (last step) text
    optin: {
      title: "¡Estamos listos para atenderte!",
      description:
        "Comparte tu nombre y WhatsApp para que un asesor se ponga en contacto contigo.",
    },
  },

  // ── Thank You page ────────────────────────────────────────────────────────
  thankyou: {
    title: "¡Gracias por contactarnos!",
    description:
      "En breve, uno de nuestros asesores se pondrá en contacto contigo.",
    whatsappCta: "O escríbenos directo por WhatsApp",
  },
};
