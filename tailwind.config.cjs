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

        orange:{
          100: '#FFF5F0'
        },

        grey: {
          300: '#EBEBEB',
          400: '#D9D9D9',
          600: '#A8A8A8',
          900: '#262626',
        },
        //text-functional-success, text-functional-error
        functional: {
          success: '#72C040',
          error: '#EC5B56',
        },
      },

      //폰트 설정
      fontSize: {
        //10px
        '2xs-regular': ['0.6rem', { fontWeight: 400, lineHeight: '150%' }],
        '2xs-medium': ['0.6rem', { fontWeight: 500, lineHeight: '150%' }],
        //12px
        'xs-regular': ['0.75rem', { fontWeight: 400, lineHeight: '150%' }],
        'xs-medium': ['0.75rem', { fontWeight: 500, lineHeight: '150%' }],
        //14px
        's-regular': ['0.875rem', { fontWeight: 400, lineHeight: '150%' }],
        's-medium': ['0.875rem', { fontWeight: 500, lineHeight: '150%' }],
        's-bold': ['0.875rem', { fontWeight: 700, lineHeight: '150%' }],
        //16px
        'm-regular': ['1rem', { fontWeight: 400, lineHeight: '150%' }],
        'm-medium': ['1rem', { fontWeight: 500, lineHeight: '150%' }],
        //18px
        'l-regular': ['1.125rem', { fontWeight: 400, lineHeight: '150%' }],
        'l-medium': ['1.125rem', { fontWeight: 500, lineHeight: '150%' }],
        //20px
        'xl-medium': ['1.25rem', { fontWeight: 500, lineHeight: '150%' }],
        'xl-bold': ['1.25rem', { fontWeight: 700, lineHeight: '150%' }],
        //24px
        '2xl-medium': ['1.5rem', { fontWeight: 500, lineHeight: '150%' }],
        '2xl-bold': ['1.5rem', { fontWeight: 700, lineHeight: '150%' }],
        //32px
        '3xl-medium': ['2rem', { fontWeight: 500, lineHeight: '150%' }],
        '3xl-bold': ['2rem', { fontWeight: 700, lineHeight: '150%' }],
        //48px
        '4xl-medium': ['3rem', { fontWeight: 500, lineHeight: '150%' }],
        '4xl-bold': ['3rem', { fontWeight: 700, lineHeight: '150%' }],
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
