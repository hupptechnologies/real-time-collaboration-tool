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
      '@typescript-eslint/no-explicit-any': 'off',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'react-hooks/exhaustive-deps': 'off',
			'no-console': ['error'],
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'all',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
				},
			],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error',
    }
  })
];
export default eslintConfig;
