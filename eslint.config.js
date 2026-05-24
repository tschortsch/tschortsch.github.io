import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { configs as tsConfigs, parser as tsParser } from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...tsConfigs.recommended,
	// import plugin
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	eslintPluginPrettierRecommended, // prettier plugin must be placed at the bottom
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'import-x/no-unresolved': 'off', // TODO check why the svelte aliases (eg. $app/xy) don't work with the import plugin
			// Disable import-x/no-duplicate because of issues with imports from svelte/xy (eg. svelte/animate). TODO Reenable once https://github.com/import-js/eslint-plugin-import/issues/1479 is fixed.
			'import-x/no-duplicates': 'off',
			'no-duplicate-imports': 'error',
			'import-x/order': [
				'error',
				{
					alphabetize: {
						caseInsensitive: false,
						order: 'asc',
						orderImportKind: 'asc',
					},
					groups: [
						'builtin',
						'external',
						'type',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'never',
				},
			],
			// Enable checking of the inline order of imports (everything in { ... }) but disables the order of the import statements, since this is done with the 'import-x/order' rule
			'sort-imports': [
				'error',
				{
					ignoreDeclarationSort: true,
					ignoreCase: true,
				},
			],
		},
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: tsParser,
			},
		},
		rules: {
			'svelte/no-at-html-tags': 'off',
			'svelte/no-navigation-without-resolve': 'warn',
		},
	},
);
