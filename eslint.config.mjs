import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json', // Ensure ESLint reads TypeScript settings
      tsconfigRootDir: __dirname,
      ecmaFeatures: { jsx: true }
    },
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@next/next/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier'
    ],
    ignorePatterns: ['**/build/**', '**/dist/**', 'eslint.config.mjs'],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': ['error'],
      'react/prop-types': 0,
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'prefer-const': 'error',
      'no-var': ['warn'],
      'no-console': ['warn'],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_'
        }
      ],
      camelcase: ['off'],
      'init-declarations': ['error', 'always'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always'
        }
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'allow'
        }
      ],
      'no-trailing-spaces': ['error'],
      'react-hooks/exhaustive-deps': 'off',
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      eqeqeq: 'error',
      curly: 'error',
      'no-duplicate-imports': 'error',
      'linebreak-style': 'off',
      'react/destructuring-assignment': ['off'],
      'eslint no-useless-escape': 'off',
      'no-unreachable': 'off',
      // Enforce explicit return type for functions
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
          allowHigherOrderFunctions: false
        }
      ],

      // Enforce type definitions for parameters
      '@typescript-eslint/typedef': [
        'error',
        {
          parameter: true,
          propertyDeclaration: true
        }
      ]
    }
  })
];
export default eslintConfig;
