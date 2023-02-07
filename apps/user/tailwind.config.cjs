const tailwindConfig = require('../../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],
  theme: {
    ...tailwindConfig.theme,

    // default breakpoints but with 40px removed
    screens: {
      xl: { max: '1440px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
      xs: { max: '431px' },
    },

    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: {},
      // default breakpoints but with 40px removed
      screens: {
        // xl: '1320px',
        // lg: '960px',
        // md: '720px',
        // sm: '540px',
      },
    },
    extend: {
      ...tailwindConfig.theme.extend,

      content: {
        'ExclamationCircle': 'url("/assets/icons/ExclamationCircle.svg")',
      },
    },
  },
};
