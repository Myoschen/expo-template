/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:tailwindcss/recommended'],
  rules: {
    'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'always', propElementValues: 'always' }],
    'react/jsx-boolean-value': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'import/order': 'off'
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts'
    }
  }
}
