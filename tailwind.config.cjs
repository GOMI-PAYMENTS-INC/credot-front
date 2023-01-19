const lineClampPlugin = require('@tailwindcss/line-clamp');
const daisyui = require('daisyui');

module.exports = {

  //line-clamp 사용법 : https://postsrc.com/code-snippets/how-to-multi-line-trucate-text-in-tailwindcss
  plugins: [lineClampPlugin, daisyui],
  daisyui: { themes: false },
  theme: {
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
      padding: {
        // xs: '17px',
        // sm: '18px',
        // md: '24px',
        // lg: '15px',
        //xl: '60px',
      },
      // default breakpoints but with 40px removed
      screens: {
        //   'xs': '430px',
        //
        //   'sm': '576px',
        //   // => @media (min-width: 640px) { ... }
        //
        //   'md': '768px',
        //   // => @media (min-width: 768px) { ... }
        //
        //'lg':'992px',
        //   // 1440px ~ 992px
        //
        xl: '1440px',
        // 1440px 이상
        //
      },
    },

    extend: {
      gridTemplateRows: {
        tab: 'repeat(auto-fill, minmax(0, 56px))',
      },
      //색상
      colors: {
        primary: {
          'red-orange': '#FF5100',
        },

        orange: {
          900: '#9E2F00',
          800: '#B83A00',
          700: '#D54400',
          600: '#E64900',
          500: '#FF5100',
          400: '#FF6C28',
          300: '#FFA378',
          200: '#FFDAC8',
          100: '#FFF5F0',
          60: '#FFF8F5',
        },

        grey: {
          50: '#FCFCFC',
          100: '#F8F8F8',
          200: '#F5F5F5',
          300: '#EBEBEB',
          400: '#D9D9D9',
          500: '#BFBFBF',
          600: '#A8A8A8',
          700: '#8C8C8C',
          800: '#595959',
          900: '#262626',
        },
        //text-functional-success, text-functional-error
        functional: {
          link: '#4090F7',
          success: '#72C040',
          warning: '#EFAF41',
        },
      },

      //폰트 설정
      fontSize: {
        '4XL/Bold': [' 48px', { fontWeight: 700, lineHeight: '60px' }],
        '4XL/Medium': ['48px', { fontWeight: 500, lineHeight: '60px' }],
        '4XL/Regular': ['48px', { fontWeight: 400, lineHeight: '60px' }],
        '4XL/Light': ['48px', { fontWeight: 400, lineHeight: '60px' }],

        '3XL/Bold': ['32px', { fontWeight: 700, lineHeight: '40px' }],
        '3XL/medium': ['32px', { fontWeight: 500, lineHeight: '40px' }],
        '3XL/Regular': ['32px', { fontWeight: 400, lineHeight: '40px' }],
        '3XL/Light': ['32px', { fontWeight: 400, lineHeight: '40px' }],

        '2XL/Bold': ['24px', { fontWeight: 700, lineHeight: '32px' }],
        '2XL/Medium': ['24px', { fontWeight: 500, lineHeight: '32px' }],
        '2XL/Regular': ['24px', { fontWeight: 400, lineHeight: '32px' }],
        '2XL/Light': ['24px', { fontWeight: 400, lineHeight: '32px' }],

        'XL/Bold': ['20px', { fontWeight: 700, lineHeight: '28px' }],
        'XL/Medium': ['20px', { fontWeight: 500, lineHeight: '28px' }],
        'XL/Regular': ['20px', { fontWeight: 400, lineHeight: '28px' }],
        'XL/Light': ['20px', { fontWeight: 300, lineHeight: '28px' }],

        'L/Bold': ['18px', { fontWeight: 700, lineHeight: '26px' }],
        'L/Medium': ['18px', { fontWeight: 500, lineHeight: '26px' }],
        'L/Regular': ['18px', { fontWeight: 400, lineHeight: '26px' }],
        'L/Light': ['18px', { fontWeight: 300, lineHeight: '26px' }],

        'M/Bold': ['16px', { fontWeight: 700, lineHeight: '24px' }],
        'M/Medium': ['16px', { fontWeight: 500, lineHeight: '24px' }],
        'M/Regular': ['16px', { fontWeight: 400, lineHeight: '24px' }],
        'M/Light': ['16px', { fontWeight: 300, lineHeight: '24px' }],

        'S/Bold': ['14px', { fontWeight: 700, lineHeight: '24px' }],
        'S/Medium': ['14px', { fontWeight: 500, lineHeight: '24px' }],
        'S/Regular': ['14px', { fontWeight: 400, lineHeight: '24px' }],
        'S/Light': ['14px', { fontWeight: 300, lineHeight: '24px' }],

        'XS/Bold': ['12px', { fontWeight: 700, lineHeight: '16px' }],
        'XS/Medium': ['12px', { fontWeight: 500, lineHeight: '16px' }],
        'XS/Regular': ['12px', { fontWeight: 400, lineHeight: '16px' }],
        'XS/Light': ['12px', { fontWeight: 300, lineHeight: '16px' }],

        '2XS/Bold': ['10px', { fontWeight: 700, lineHeight: '12px' }],
        '2XS/Medium': ['10px', { fontWeight: 500, lineHeight: '12px' }],
        '2XS/Regular': ['10px', { fontWeight: 400, lineHeight: '12px' }],
        '2XS/Light': ['10px', { fontWeight: 300, lineHeight: '12px' }],
      },

      gridTemplateColumns: {
        'select-keyword': '0.23fr 1fr 0.38fr',
        //선택한 키워드 아이템 내부 grid
        tab: 'repeat(5, minmax(140px, 1fr))',
      },
      boxShadow: {
        partnerCard: '0px 10.1598px 20.3197px rgba(0, 0, 0, 0.08)',
      },
      gap: {
        //선택한 키워드 아이템 내부 grid gap
        'select-keyword-item': '0.6875rem',
      },
    },
  },
};
