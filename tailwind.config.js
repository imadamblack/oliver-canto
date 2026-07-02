/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────────
      // brand-1: primary (main CTAs, accents)
      // brand-2: secondary accent
      // brand-3: error / alert
      // brand-4: dark / text
      // brand-5: success / positive CTA (WhatsApp green, etc.)
      // brand-6: light background
      colors: {
        brand: {
          1: "#1a1a2e",   // primary dark
          2: "#e94560",   // accent / highlight
          3: "#dc3545",   // error / danger
          4: "#0f3460",   // dark blue
          5: "#00a650",   // success / WhatsApp
          6: "#f5f5f5",   // light bg
        },
      },
      container: {
        center: true,
        padding: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
