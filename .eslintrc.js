module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off', // Allow console for debugging
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-const': 'warn',
    'no-var': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
  },
  globals: {
    browser: 'readonly',
    chrome: 'readonly',
  },
};
