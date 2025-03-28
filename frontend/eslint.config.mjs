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
			'eslint:recommended',
			'prettier',
			'plugin:@next/next/recommended',
			'plugin:react/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended-legacy',
			'plugin:prettier/recommended'
		],
		ignorePatterns: ['.next', '.vscode', 'node_modules', 'public'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'react-hooks/exhaustive-deps': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/no-unescaped-entities': 'error',
			'@next/next/no-page-custom-font': 'error',
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
			'no-duplicate-imports': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'import/no-unresolved': 'off',
			'import/no-extraneous-dependencies': 'error',
			'react/jsx-uses-react': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'jsx-a11y/anchor-is-valid': 'off'
		}
	})
];

export default eslintConfig;
