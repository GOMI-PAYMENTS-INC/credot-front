module.exports = {
  root: true,
  // ESLint 사용을 위해 지원하려는 Javascript 언어 옵션
  parserOptions: {
    ecmaVersion: 2021, //  사용할 ECMAScript 버전
    sourceType: 'module', // parser 의  export  형태를 설정
    ecmaFeatures: {
      // ECMScript 규격의 JSX 사용 여부
      jsx: true,
    },
  },
  // 사전 정의된 전역 변수 사용을 정의
  // browser, node 설정을 하지 않으면  console, require  // 같은 사전에 정의된 전역변수 환경에 있는  static  메서드를 인식할 수 없어 에러가 발생한다.
  env: {
    browser: true,
    node: true,
    // 'jest/globals': true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'simple-import-sort'],
  extends: ['plugin:react/recommended'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // top level require 가 아니면 error    'global-require': 'off',
    // jsx 파일의 확장자

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // import 순서
    'simple-import-sort/imports': 'error',

    'import/extensions': [
      'error',
      'always',
      {
        pattern: {
          jsx: 'never',
          tsx: 'never',
        },
      },
    ],
  },
  overrides: [
    {
      files: './apps/*.ts?(x)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json', './apps/**/tsconfig.json'],
      },
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'airbnb-typescript'],
      rules: {
        // devDependencies 에 선언되지 않은 외부 모듈을 가져올 때 error        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

        // named export 허용
        'import/prefer-default-export': 'off',

        // 연산자 이후 줄바꿈
        'operator-linebreak': 'off',

        'react/react-in-jsx-scope': 'off',

        // jsx 내에서 single quotation 사용 가능
        'jsx-quotes': 'off',

        // 줄바꿈시 2칸 indent 이외의 indent 를 허용
        '@typescript-eslint/indent': 'off',

        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': 'off',
        'implicit-arrow-linebreak': 'off',

        'import/extensions': [
          'error',
          'ignorePackages',
          {
            cjs: 'never',
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],

        'import/no-cycle': 'warn',

        'no-confusing-arrow': 'off',

        'no-plusplus': 'off',

        'function-paren-newline': 'off',

        'object-curly-newline': 'off',

        // tag self-closing
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],

        // 불필요한 중괄호 제거
        'react/jsx-curly-brace-presence': [
          'error',
          { props: 'never', children: 'never' },
        ],

        'react/prop-types': 'off',
        'react/display-name': 'off',

        '@typescript-eslint/no-shadow': 'off',
      },
    },
  ],
};
