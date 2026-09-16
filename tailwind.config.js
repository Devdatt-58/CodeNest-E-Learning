/** @type {import('tailwindcss').Config} */

/**
 * CodeNest design tokens.
 *
 * The legacy StudyNotion colour *names* are kept on purpose (richblack, yellow,
 * blue, ...) so that no component breaks, but every value has been re-mapped to
 * the CodeNest palette. Prefer the semantic aliases (ink / surface / card /
 * line / accent / accent2) in new code.
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      "edu-sa": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",

      /* ---- Semantic CodeNest tokens (preferred) ---- */
      ink: "#0B1120", // page background
      surface: "#111827", // raised background / bands
      card: "#151E2E", // cards, inputs, menus
      line: "rgba(148,163,184,0.15)", // hairline borders
      "line-strong": "rgba(148,163,184,0.28)",
      accent: {
        DEFAULT: "#6366F1",
        soft: "rgba(99,102,241,0.14)",
        ring: "rgba(99,102,241,0.45)",
      },
      accent2: {
        DEFAULT: "#22D3EE",
        soft: "rgba(34,211,238,0.12)",
      },

      /* ---- Neutral ramp (legacy name: richblack) ---- */
      richblack: {
        5: "#F8FAFC", // primary text
        25: "#E2E8F0",
        50: "#CBD5E1",
        100: "#94A3B8", // secondary text
        200: "#8494AB",
        300: "#748297",
        400: "#5A6B84",
        500: "#475569",
        600: "#334155",
        700: "#1E293B", // borders / dividers
        750: "#182235",
        800: "#151E2E", // cards
        850: "#111827", // secondary background
        900: "#0B1120", // primary background
      },

      /* Legacy alias, kept so old classes keep resolving */
      richblue: {
        5: "#EEF2FF",
        25: "#C7D2FE",
        50: "#A5B4FC",
        100: "#818CF8",
        200: "#6366F1",
        300: "#4F46E5",
        400: "#4338CA",
        500: "#3730A3",
        600: "#312E81",
        700: "#272264",
        800: "#1E1B4B",
        900: "#14142B",
      },

      /* ---- Secondary accent: cyan (legacy name: blue) ---- */
      blue: {
        5: "#ECFEFF",
        25: "#A5F3FC",
        50: "#67E8F9",
        100: "#22D3EE",
        200: "#06B6D4",
        300: "#0891B2",
        400: "#0E7490",
        500: "#155E75",
        600: "#164E63",
        700: "#123C4C",
        800: "#0E303D",
        900: "#0A242E",
      },

      /* ---- Primary accent: indigo (legacy name: yellow) ---- */
      yellow: {
        5: "#EEF0FF",
        25: "#C7CBFF",
        50: "#6366F1",
        100: "#818CF8",
        200: "#4F46E5",
        300: "#4338CA",
        400: "#3730A3",
        500: "#312E81",
        600: "#282461",
        700: "#221F4E",
        800: "#1B1B3A",
        900: "#14142B",
      },

      /* ---- Success (legacy name: caribbeangreen) ---- */
      caribbeangreen: {
        5: "#ECFDF5",
        25: "#A7F3D0",
        50: "#6EE7B7",
        100: "#34D399",
        200: "#10B981",
        300: "#059669",
        400: "#047857",
        500: "#065F46",
        600: "#064E3B",
        700: "#053F30",
        800: "#043026",
        900: "#03251D",
      },

      /* ---- Warning / ratings (legacy name: brown) ---- */
      brown: {
        5: "#FEF3C7",
        25: "#FDE68A",
        50: "#FCD34D",
        100: "#FBBF24",
        200: "#F59E0B",
        300: "#D97706",
        400: "#B45309",
        500: "#92400E",
        600: "#78350F",
        700: "#5C2A0C",
        800: "#452009",
        900: "#2E1506",
      },

      /* ---- Danger (legacy name: pink) ---- */
      pink: {
        5: "#FFF1F2",
        25: "#FECDD3",
        50: "#FDA4AF",
        100: "#FB7185",
        200: "#F43F5E",
        300: "#E11D48",
        400: "#BE123C",
        500: "#9F1239",
        600: "#881337",
        700: "#6B0F2C",
        800: "#500B21",
        900: "#360717",
      },

      "pure-greys": {
        5: "#0B1120",
        25: "#111827",
        50: "#151E2E",
        100: "#1E293B",
        200: "#334155",
        300: "#94A3B8",
        400: "#748297",
        500: "#475569",
        600: "#334155",
        700: "#1E293B",
        800: "#151E2E",
        900: "#0B1120",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1200px",
        maxContentTab: "650px",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.30)",
        lift: "0 12px 28px -12px rgba(0,0,0,0.65)",
        glow: "0 0 0 1px rgba(99,102,241,0.35), 0 14px 40px -18px rgba(99,102,241,0.55)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.30), 0 14px 40px -18px rgba(34,211,238,0.45)",
      },
      backgroundImage: {
        "nest-grid":
          "linear-gradient(rgba(148,163,184,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.055) 1px, transparent 1px)",
        "nest-glow":
          "radial-gradient(60% 55% at 50% 0%, rgba(99,102,241,0.22) 0%, rgba(11,17,32,0) 70%)",
        "nest-sheen":
          "linear-gradient(135deg, rgba(99,102,241,0.16) 0%, rgba(34,211,238,0.10) 55%, rgba(11,17,32,0) 100%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 400ms cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 300ms ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
      },
      transitionTimingFunction: {
        nest: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
