module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  overrides: [
    {
      extends: [
        'plugin:vue/vue3-recommended',
      ],
      files: ['src/**/*.vue'],
      rules: {
        'no-spaced-func': 'off',
        'vue/component-api-style': ['error', [
          'script-setup',
        ]],
        'vue/component-tags-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
        'vue/multi-word-component-names': 'off',
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/sort-keys': ['error', 'asc', {
          caseSensitive: false,
        }],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: [
    'import',
    'import-newlines',
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import-newlines/enforce': ['error', 1],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        [
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'object',
        'type',
      ],
      'newlines-between': 'always',
    }],
    'object-curly-newline': ['error', {
      ImportDeclaration: {
        minProperties: 2,
      },
    }],
    'sort-imports': ['error', {
      allowSeparatedGroups: true,
      ignoreCase: true,
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
