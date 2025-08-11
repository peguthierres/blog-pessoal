/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        stone: {
          css: {
            '--tw-prose-body': '#57534e',
            '--tw-prose-headings': '#1c1917',
            '--tw-prose-lead': '#57534e',
            '--tw-prose-links': '#1c1917',
            '--tw-prose-bold': '#1c1917',
            '--tw-prose-counters': '#78716c',
            '--tw-prose-bullets': '#a8a29e',
            '--tw-prose-hr': '#e7e5e4',
            '--tw-prose-quotes': '#1c1917',
            '--tw-prose-quote-borders': '#d6d3d1',
            '--tw-prose-captions': '#78716c',
            '--tw-prose-code': '#1c1917',
            '--tw-prose-pre-code': '#e7e5e4',
            '--tw-prose-pre-bg': '#1c1917',
            '--tw-prose-th-borders': '#d6d3d1',
            '--tw-prose-td-borders': '#e7e5e4',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};