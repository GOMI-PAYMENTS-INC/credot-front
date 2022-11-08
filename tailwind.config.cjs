module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
  theme: {
    extend: {
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
        },
      },
      fontSize: {
        '100-medium': ['10px', { fontWeight: 500, lineHeight: '160%' }],

        '200-regular': ['13px', { fontWeight: 400, lineHeight: '150%' }],
        '200-medium': ['13px', { fontWeight: 500, lineHeight: '150%' }],

        '300-regular': ['15px', { fontWeight: 400, lineHeight: '150%' }],
        '300-medium': ['15px', { fontWeight: 500, lineHeight: '150%' }],

        '400-medium': ['17px', { fontWeight: 500, lineHeight: '150%' }],

        '500-medium': ['20px', { fontWeight: 500, lineHeight: '150%' }],
        '500-bold': ['20px', { fontWeight: 700, lineHeight: '150%' }],

        '600-medium': ['24px', { fontWeight: 500, lineHeight: '150%' }],
        '600-bold': ['24px', { fontWeight: 700, lineHeight: '150%' }],
      },
    },
  },
};
