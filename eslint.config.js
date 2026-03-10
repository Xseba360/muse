import xo from 'eslint-config-xo';
import tsespree from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';

export default [
	...xo,
	{
		languageOptions: {
			parser: tsespree,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			import: pluginImport,
			'@typescript-eslint': pluginTypeScript,
		},
		rules: {
			'new-cap': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_|^unused$',
					destructuredArrayIgnorePattern: '^_|^unused$',
					ignoreRestSiblings: true,
					// Allow catch clause parameters that are intentionally unused
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/prefer-readonly-parameter-types': 'off',
			'@typescript-eslint/no-implicit-any-catch': 'off',
			'@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
			'@stylistic/object-curly-newline': 'off',
			'@stylistic/curly-newline': 'off',
			'@stylistic/function-paren-newline': 'off',
			'@stylistic/lines-between-class-members': 'off',
			'preserve-caught-error': 'off',
			'logical-assignment-operators': 'off',
			'@stylistic/max-len': 'off',
			// Allow void returns for Discord.js event handlers
			'no-void': ['error', { allowAsStatement: true }],
			// Allow NodeJS namespace (used in type definitions)
			'no-undef': 'off',
			// Disable require-unicode-regexp as it's not needed for most regex patterns
			'require-unicode-regexp': 'off',
			// Disable operator-linebreak to allow flexible line breaks
			'@stylistic/operator-linebreak': 'off',
			// Allow mixed operators with proper parentheses
			'@stylistic/no-mixed-operators': 'off',
		},
	},
];
