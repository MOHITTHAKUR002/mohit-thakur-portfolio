/** @type {import('tailwindcss').Config} */

// Helper function to auto-generate the FMDS scales
// Generates keys like 's-24': 'calc(var(--1) * 24)'
// And maps standard Tailwind keys (like '1', '2', '4', '8') to fluid versions
function generateScale(max, step = 1, isSpacing = false) {
  const scale = {
    px: "1px",
    0: "0px",
    full: "100%",
    auto: "auto",
    screen: "100vw",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "3/4": "75%",
  };

  // Add fluid s-X scale (the primary FMDS)
  for (let i = 0; i <= max; i += step) {
    scale[`s-${i}`] = `calc(var(--1) * ${i})`;
  }

  // If this is for spacing/width/height, map legacy TW numbers (0.5, 1, 2, 4...) to fluid pixels
  if (isSpacing) {
    const legacyUnits = [
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24,
      28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
    ];
    legacyUnits.forEach((unit) => {
      scale[unit] = `calc(var(--1) * ${unit * 4})`;
    });
  }

  return scale;
}

// Map standard text/rounded aliases to fluid values
const fmdsTypography = {
  ...generateScale(250, 1),
  xs: "calc(var(--1) * 12)",
  sm: "calc(var(--1) * 14)",
  base: "calc(var(--1) * 16)",
  lg: "calc(var(--1) * 18)",
  xl: "calc(var(--1) * 20)",
  "2xl": "calc(var(--1) * 24)",
  "3xl": "calc(var(--1) * 30)",
  "4xl": "calc(var(--1) * 36)",
  "5xl": "calc(var(--1) * 48)",
  "6xl": "calc(var(--1) * 60)",
  "7xl": "calc(var(--1) * 72)",
  "8xl": "calc(var(--1) * 96)",
  "9xl": "calc(var(--1) * 128)",
};

const fmdsRadius = {
  ...generateScale(200, 1),
  sm: "calc(var(--1) * 4)",
  md: "calc(var(--1) * 6)",
  lg: "calc(var(--1) * 8)",
  xl: "calc(var(--1) * 12)",
  "2xl": "calc(var(--1) * 16)",
  "3xl": "calc(var(--1) * 24)",
};

// Generate the primary scales using the enhanced generator
const fmdsSpacing = generateScale(2000, 1, true);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../shared/**/*.{js,ts,jsx,tsx}",
    "../../modules/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    // OVERRIDE default spacing entirely to enforce FMDS across the board.
    spacing: fmdsSpacing,

    // OVERRIDE typography sizes
    fontSize: fmdsTypography,
    lineHeight: fmdsTypography,
    letterSpacing: fmdsTypography,

    // OVERRIDE visual components
    borderRadius: {
      ...fmdsRadius,
      none: "0",
      full: "9999px",
    },
    borderWidth: {
      ...generateScale(40, 1),
      DEFAULT: "calc(var(--1) * 1)",
      0: "0",
      2: "calc(var(--1) * 2)",
      4: "calc(var(--1) * 4)",
      8: "calc(var(--1) * 8)",
    },
    ringWidth: {
      ...generateScale(40, 1),
      DEFAULT: "calc(var(--1) * 3)",
      0: "0",
      1: "calc(var(--1) * 1)",
      2: "calc(var(--1) * 2)",
      4: "calc(var(--1) * 4)",
      8: "calc(var(--1) * 8)",
    },
    ringOffsetWidth: generateScale(40, 1),
    outlineWidth: {
      ...generateScale(40, 1),
      DEFAULT: "calc(var(--1) * 1)",
      0: "0",
      1: "calc(var(--1) * 1)",
      2: "calc(var(--1) * 2)",
      4: "calc(var(--1) * 4)",
      8: "calc(var(--1) * 8)",
    },
    outlineOffset: generateScale(40, 1),
    blur: generateScale(200, 1),

    boxShadow: {
      ...generateScale(100, 1), // shadow-s-X
      none: "none",
      "s-sm": `0 calc(var(--1) * 1) calc(var(--1) * 2) 0 rgba(0, 0, 0, 0.05)`,
      "s-md": `0 calc(var(--1) * 4) calc(var(--1) * 6) calc(var(--1) * -1) rgba(0, 0, 0, 0.1), 0 calc(var(--1) * 2) calc(var(--1) * 4) calc(var(--1) * -2) rgba(0, 0, 0, 0.1)`,
      "s-lg": `0 calc(var(--1) * 10) calc(var(--1) * 15) calc(var(--1) * -3) rgba(0, 0, 0, 0.1), 0 calc(var(--1) * 4) calc(var(--1) * 6) calc(var(--1) * -4) rgba(0, 0, 0, 0.1)`,
    },

    // OVERRIDE specific layout constraints that aren't purely spacing
    maxWidth: {
      ...fmdsSpacing,
      none: "none",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch",
    },
    minWidth: {
      ...fmdsSpacing,
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    },
    minHeight: {
      ...fmdsSpacing,
      full: "100%",
      screen: "100vh",
      dvh: "100dvh",
    },
    maxHeight: {
      ...fmdsSpacing,
      full: "100%",
      screen: "100vh",
      dvh: "100dvh",
    },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        secondary: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        "bg-maincard": "var(--bg-maincard)",
        "bg-card": "var(--bg-card)",
        button: {
          primaryGradient: "var(--button-primary-gradient)",
          primaryGradientHover: "var(--button-primary-gradient-hover)",
          "primary-text": "var(--button-primary-text)",
          secondary: "var(--button-secondary)",
          "secondary-hover": "var(--button-secondary-hover)",
          "secondary-text": "var(--button-secondary-text)",
          "outline-border": "var(--button-outline-border)",
          "outline-text": "var(--button-outline-text)",
          "disabled-bg": "var(--button-disabled-bg)",
          "disabled-text": "var(--button-disabled-text)",
        },
        "input-bg": "var(--input-bg)",
        "input-text": "var(--input-text)",
        "input-placeholder": "var(--input-placeholder)",
        "input-border": "var(--input-border)",
        "input-focus": "var(--input-focus)",
        "input-error": "var(--input-error)",
        brand: {
          primary: "var(--brand-primary)",
          hover: "var(--brand-primary-hover)",
          secondary: "var(--brand-secondary)",
          primaryCard: "var(--brand-primary-card)",
          "primary-5": "var(--brand-primary-5)",
          "primary-10": "var(--brand-primary-10)",
          "primary-15": "var(--brand-primary-15)",
          "primary-20": "var(--brand-primary-20)",
          "primary-30": "var(--brand-primary-30)",
          "primary-40": "var(--brand-primary-40)",
          "primary-50": "var(--brand-primary-50)",
          "primary-60": "var(--brand-primary-60)",
          "primary-70": "var(--brand-primary-70)",
          "primary-80": "var(--brand-primary-80)",
          "primary-90": "var(--brand-primary-90)",
        },
        status: {
          success: "var(--success)",
          danger: "var(--danger)",
          "danger-5": "var(--danger-5)",
          "danger-10": "var(--danger-10)",
          "danger-15": "var(--danger-15)",
          "danger-20": "var(--danger-20)",
          "danger-30": "var(--danger-30)",
          "danger-40": "var(--danger-40)",
          "danger-50": "var(--danger-50)",
          "danger-60": "var(--danger-60)",
          "danger-70": "var(--danger-70)",
          "danger-80": "var(--danger-80)",
          "danger-90": "var(--danger-90)",
        },
        black: {
          DEFAULT: "var(--black)",
          5: "var(--black-5)",
          10: "var(--black-10)",
          15: "var(--black-15)",
          20: "var(--black-20)",
          30: "var(--black-30)",
          40: "var(--black-40)",
          50: "var(--black-50)",
          60: "var(--black-60)",
          70: "var(--black-70)",
          80: "var(--black-80)",
          90: "var(--black-90)",
        },
        white: {
          DEFAULT: "var(--white)",
          5: "var(--white-5)",
          10: "var(--white-10)",
          15: "var(--white-15)",
          20: "var(--white-20)",
          30: "var(--white-30)",
          40: "var(--white-40)",
          50: "var(--white-50)",
          60: "var(--white-60)",
          70: "var(--white-70)",
          80: "var(--white-80)",
          90: "var(--white-90)",
        },
        "surface-5": "var(--bg-surface-5)",
        "surface-10": "var(--bg-surface-10)",
        "surface-20": "var(--bg-surface-20)",
        "surface-40": "var(--bg-surface-40)",
        "surface-50": "var(--bg-surface-50)",
        "surface-60": "var(--bg-surface-60)",
        "surface-80": "var(--bg-surface-80)",
        "surface-90": "var(--bg-surface-90)",
        "page-95": "var(--bg-page-95)",
        gradientBG: "var(--gradientBG)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
          subtle: "var(--text-subtle)",
          disabled: "var(--text-disabled)",
          white: "var(--white)",
          black: "var(--black)",
        },
        bg: {
          page: "var(--bg-page)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          elevatedSecondary: "var(--bg-elevated-secondary)",
          muted: "var(--bg-muted)",
          inverse: "var(--bg-inverse)",
          icons: "var(--bg-icons)",
          modal: "var(--bg-modal)",
          controlButton: "var(--bg-control-button)",
          neutral: "var(--bg-neutral)",
          primaryLight: "var(--bg-primary-light)",
          disabled: "var(--bg-disabled)",
          buySell: "var(--bg-buy-sell)",
          select: "var(--bg-select)",
          modal: "var(--bg-modal)",
          cardGreen: "var(--bg-card-green)",
          toggleSwitch: "var(--toggle-switch-bg)",
        },
        border: {
          primary: "var(--border-primary)",
          "primary-50": "var(--border-primary-50)",
          primaryLight: "var(--border-primary-light)",
          secondary: "var(--border-secondary)",
          muted: "var(--border-muted)",
          inverse: "var(--border-inverse)",
          neutral: "var(--border-neutral)",
          gray: "var(--border-gray)",
          card: "var(--border-card)",
        },
        shadow: {
          primary: "var(--shadow-primary)",
          secondary: "var(--shadow-secondary)",
          muted: "var(--shadow-muted)",
          inverse: "var(--shadow-inverse)",
        },
        wallet: {
          card: "var(--bg-wallet-card)",
          button: {
            bg: "var(--wallet-button-bg)",
            text: "var(--wallet-button-text)",
          },
          eye: {
            bg: "var(--wallet-eye-bg)",
            color: "var(--wallet-eye-color)",
          },
        },
      },
      borderColor: {
        "input-border": "var(--input-border)",
        "input-focus": "var(--input-focus)",
        "input-error": "var(--input-error)",
      },
      backgroundImage: {
        "button-primary": "var(--button-primary)",
        "button-primary-hover": "var(--button-primary-hover)",
        "button-primary-gradient": "var(--button-primary-gradient)",
        "button-primary-gradient-hover": "var(--button-primary-gradient-hover)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "input-radius": "var(--input-radius)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".bg-bg-maincard": {
          "background-color": "var(--bg-maincard)",
        },
        ".bg-bg-card": {
          "background-color": "var(--bg-card)",
        },
      });
    },
  ],
};
