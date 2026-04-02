import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Green (primario institucional) ──
        green: {
          50:  '#e6f2eb',
          100: '#b0d5bf',
          200: '#8ac1a1',
          300: '#54a576',
          400: '#33935b',
          500: '#007832',
          600: '#006d2e',
          700: '#005524',
          800: '#00421c',
          900: '#003215',
        },
        // ── Lime (acento) ──
        lime: {
          50:  '#ebf6e6',
          500: '#39a900',
          600: '#349a00',
        },
        // ── Cerulean ──
        cerulean: {
          50:  '#e6eaed',
          500: '#00304d',
          700: '#002237',
        },
        // ── Celeste ──
        celeste: {
          50:  '#e6fafc',
          500: '#00ccde',
          700: '#00919e',
        },
        // ── Púrpura (sidebar) ──
        purpura: {
          50:  '#f5edff',
          100: '#dfc6ff',
          200: '#cfaaff',
          300: '#b984ff',
          400: '#ac6cff',
          500: '#9747ff',
          600: '#8941e8',
          700: '#6b32b5',
          800: '#53278c',
          900: '#3f1e6b',
        },
        // ── Red ──
        red: {
          50:  '#ffe9e9',
          200: '#ff9898',
          300: '#ff6969',
          500: '#ff1f1f',
          600: '#e81c1c',
          700: '#b51616',
        },
        // ── Yellow-Orange ──
        yellowrange: {
          50:  '#fff9e6',
          500: '#fdc300',
          700: '#b48a00',
        },
        // ── Neutral ──
        neutral: {
          50:  '#f1f1f1',
          100: '#d4d4d4',
          200: '#bfbfbf',
          300: '#a1a1a1',
          400: '#8f8f8f',
          500: '#737373',
          600: '#696969',
          700: '#525252',
          800: '#3f3f3f',
          900: '#303030',
        },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.08)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}

export default config
