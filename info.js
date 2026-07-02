// ─── Project / Brand Info ─────────────────────────────────────────────────────
// Edit this file for each project. Everything here is project-specific.

export const info = {
  legalName: "Chef Oliver Canto",
  companyName: "Chef Oliver Canto",
  description: "Consultoría gastronómica",

  email: {
    sender: "",
    recipients: [""],
    subject: "Nuevo prospecto",
  },

  phoneNumber: "+5212223622104",

  whatsapp: {
    value: "+5212223622104",
    message: "Hola, me interesa su consultoría para mi restaurante",
  },

  social: {
    facebook: "",
    instagram: "",
  },

  address: {
    address: "",
    col: "",
    cp: "",
    city: "",
    state: "",
  },

  // n8n or any POST webhook that receives the lead
  optInWebhook: "",
  surveyWebhook: "https://n8n.notoriovs.com/webhook/31ed2e2a-3bba-4e97-8852-80eee61f1cf2",

  // Where to redirect after survey completion (leave empty to use /thankyou)
  surveyRedirect: "",

  privacyNotice: "/aviso-privacidad",
  termsConditions: "/aviso-privacidad",

  // Optional: promo bar text shown at the top of each page (set null to hide)
  promoBar: null,
};
