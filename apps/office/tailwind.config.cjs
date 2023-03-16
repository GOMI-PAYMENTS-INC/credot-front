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
      xs: { max: '430px' },
    },

    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      // padding: {
      //   xl: '60px',
      //   lg: '12px',
      //   md: '24px',
      //   sm: '24px',
      // },
      // default breakpoints but with 40px removed
      // screens: {
      //   //xl이상인 경우
      //   lg: '1440px',
      //   md: '992px',
      //   sm: '768px',
      //   xs: '540px'
      // },
    },

    extend: {
      ...tailwindConfig.theme.extend,

      // backgroundImage: {
      //   main: "url('../src/assets/images/Section9/Background.png')",
      // },

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
