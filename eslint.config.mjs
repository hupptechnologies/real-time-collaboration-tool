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
      project: './tsconfig.json',
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
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': ['error',  { useTabs: true, tabWidth: 2 }],
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
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      eqeqeq: 'error',
      curly: 'error',
      'no-duplicate-imports': 'error',
      'linebreak-style': 'off',
      'react/destructuring-assignment': ['off'],
      'eslint no-useless-escape': 'off',
      'no-unreachable': 'off',

      // typescript rules
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true }
      ], // Ensure all functions have return types
      '@typescript-eslint/no-inferrable-types': 'error', // Prevent unnecessary type declarations
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'], // Prefer `type` over `interface`
      '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Prevent redundant type assertions
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNullableObject: false }
      ], // Avoid implicit boolean coercions
      '@typescript-eslint/typedef':'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_', // Allow unused args prefixed with _
        },
      ],
      'react-hooks/rules-of-hooks': 'error', // Ensure hooks are used correctly
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in hooks
    }
  })
];
export default eslintConfig;
