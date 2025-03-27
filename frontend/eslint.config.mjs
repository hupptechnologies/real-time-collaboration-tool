import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended
});

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'next/typescript',
			'prettier',
			'plugin:prettier/recommended',
			'plugin:@next/next/recommended'
		],
		ignorePatterns: ['.next', '.vscode', 'node_modules', 'public'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'react-hooks/exhaustive-deps': 'off',
			'no-console': [
				'error',
				{
					allow: ['info']
				}
			],
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'all',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_'
				}
			],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error'
		}
	})
];

export default eslintConfig;
