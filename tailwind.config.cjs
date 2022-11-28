module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  //line-clamp 사용법 : https://postsrc.com/code-snippets/how-to-multi-line-trucate-text-in-tailwindcss
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
  theme: {
    extend: {

      //색상
      colors: {
        primary: {
          'red-orange': '#FF5100',
          black: '#333333',
        },

        grey: {
          400: '#D9D9D9',
          600: '#A8A8A8',
          900: '#262626',
        },
        functional: {
          success: '#72C040',
          'error': '#EC5B56',
        },
      },

      //폰트 설정
      fontSize: {
        //10px
        '100-regular': ['0.625rem', { fontWeight: 400, lineHeight: '150%' }],
        '100-medium': ['0.625rem', { fontWeight: 500, lineHeight: '160%' }],

        //13px
        '200-regular': ['0.8125rem', { fontWeight: 400, lineHeight: '150%' }],
        '200-medium': ['0.8125rem', { fontWeight: 500, lineHeight: '150%' }],
        '200-bold': ['0.8125rem', { fontWeight: 700, lineHeight: '150%' }],
        //15px
        '300-regular': ['0.9375rem', { fontWeight: 400, lineHeight: '150%' }],
        '300-medium': ['0.9375rem', { fontWeight: 500, lineHeight: '150%' }],
        //17px
        '400-medium': ['1.0625rem', { fontWeight: 500, lineHeight: '150%' }],
        //20px
        '500-medium': ['1.25rem', { fontWeight: 500, lineHeight: '150%' }],
        '500-bold': ['1.25rem', { fontWeight: 700, lineHeight: '150%' }],
        //24px
        '600-medium': ['1.5rem', { fontWeight: 500, lineHeight: '150%' }],
        '600-bold': ['1.5rem', { fontWeight: 700, lineHeight: '150%' }],
      },

      gridTemplateColumns: {
        'select-keyword': '0.23fr 1fr 0.38fr',
        //선택한 키워드 아이템 내부 grid
        'select-keyword-item': '1fr 0.5fr 0.5fr 1.5rem',
      },

      gap: {
        //선택한 키워드 아이템 내부 grid gap
        'select-keyword-item': '0.6875rem',
      }
    },
  },
};
