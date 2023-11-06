const tailwindConfig = require('../../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],
  theme: {
    ...tailwindConfig.theme,

    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
    },
    extend: {
      ...tailwindConfig.theme.extend,
      gridTemplateColumns: {
        //선택한 키워드 아이템 내부 grid
        'select-keyword': '0.23fr 1fr 0.38fr',
        tab: 'repeat(5, minmax(140px, 1fr))',
      },
    },
  },
};
