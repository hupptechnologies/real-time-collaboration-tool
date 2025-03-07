import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: ['node_modules/', 'dist/', 'bulid/'] },
	pluginJs.configs.recommended,
	{
		files: ['**/*.{js,cjs,ts}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
		},
		plugins: { '@typescript-eslint': tseslint },
		rules: {
			...tseslint.configs.recommended.rules,
		},
	},
	{
		plugins: { prettier: prettierPlugin },
		rules: {
			...prettierConfig.rules,
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'comma-spacing': ['error', { before: false, after: true }],
			'no-var': ['error'],
			'prefer-const': 'error',
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
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'always',
					asyncArrow: 'always',
				},
			],
			'keyword-spacing': ['error', { before: true, after: true }],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-trailing-spaces': ['error'],
			'react-hooks/exhaustive-deps': 'off',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'@typescript-eslint/no-explicit-any': 'off',
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error',
		},
	},
];
