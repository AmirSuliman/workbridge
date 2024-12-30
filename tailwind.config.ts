import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '1700px': '1700px',
      },
      colors: {
        background: '#F5F6FA',
        foreground: '#000',
        'dark-gray': '#282828',
        'light-gray': '#D9D9D9',
        'super-light-gray': '#0000009E',
        'txt-dark-gray': '#000000CC',
        'blue-base': '#007BB2',
        'dark-navy': '#0F172A',
        'gray-border': '#E8E8E8',
      },
      boxShadow: {
        'custom-deep': '0px 4px 77px 0px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
