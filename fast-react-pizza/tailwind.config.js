/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    // The code above gonna overwrite tailwindcss default configration.
    // It's better to use extend.
    // There is the default configurations link:
    // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
    extend: {
      screens: {
        xs: '360px',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
