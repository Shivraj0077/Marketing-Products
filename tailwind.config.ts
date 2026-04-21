import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        // Strict White Theme Palette
        background: '#FFFFFF',
        surface: '#F8FAFC',
        border: {
          DEFAULT: '#E2E8F0',
          active: '#CBD5E1'
        },
        primary: {
          DEFAULT: '#5E6AD2',
          hover: '#4C58B8',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#38BDF8', // Sky blue on white
          foreground: '#0F172A'
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          disabled: '#94A3B8'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B'
        }
  		},
  		borderRadius: {
  			lg: '12px',
  			md: '8px',
  			sm: '4px',
  		},
      spacing: {
        'base': '4px',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0,0,0,0.05)',
        'lifted': '0 10px 40px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        '150': '150ms',
      }
  	}
  },
  plugins: [tailwindAnimate],
};
export default config;
