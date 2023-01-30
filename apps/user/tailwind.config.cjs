const tailwindConfig = require('../../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],
  theme: {
    ...tailwindConfig.theme,

    extend: {
      ...tailwindConfig.theme.extend,
      }
  }
};
