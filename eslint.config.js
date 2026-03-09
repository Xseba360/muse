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
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
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
		},
	},
];
