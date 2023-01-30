const tailwindConfig = require('../../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],
  theme: {
    ...tailwindConfig.theme,

    extend: {
      ...tailwindConfig.theme.extend,

      backgroundImage: {
        main: "url('./src/assets/images/Section8/Background.png')",
      },

      gridTemplateColumns: {
        //선택한 키워드 아이템 내부 grid
        'select-keyword': '0.23fr 1fr 0.38fr',

        tab: 'repeat(5, minmax(140px, 1fr))',
      },

      boxShadow: {
        'partner-card': '0px 10.1598px 20.3197px rgba(0, 0, 0, 0.08)',
      },

      gap: {
        //선택한 키워드 아이템 내부 grid gap
        'select-keyword-item': '0.6875rem',
      },
    },
  },
};
