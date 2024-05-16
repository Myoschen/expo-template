/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  endOfLine: 'lf',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILT_IN_MODULES>',
    '^(react/(.*)$)|^(react$)',
    '^(react-native/(.*)$)|^(react-native$)',
    '^(expo/(.*)$)|^(expo$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/api/(.*)$',
    '^@/constants/(.*)$',
    '^@/types/(.*)$',
    '^@/utils/(.*)$',
    '^@/hooks/(.*)$',
    '^@/stores/(.*)$',
    '^@/app/(.*)$',
    '^@/components/base$',
    '^@/components/(.*)$',
    '^#/(.*)$',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.4.5'
}
