module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'rules': {
		semi: ['error', 'never'],
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'func-style': ['error', 'declaration', {
			'allowArrowFunctions': true
		}],
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single', {
			'allowTemplateLiterals': true
		}]
	}
}
