export default {
  locales: ['en', 'es'],
  output: 'src/locales/$LOCALE/translation.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  defaultValue: (lng, ns, key) => key,
  createOldCatalogs: false,
  keySeparator: '.',
  namespaceSeparator: ':',
  lexers: {
    js: ['JsxLexer'],
    jsx: ['JsxLexer'],
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  }
}