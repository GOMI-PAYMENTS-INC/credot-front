const tailwindConfig = require('../../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],
  extend: {
    ...tailwindConfig.extend,
    backgroundImage: {
      main: "url('/src/assets/images/Section8/Background.png')",
    },
  },
};
