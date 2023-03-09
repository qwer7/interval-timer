module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@antfu',
    'plugin:vue-pug/vue3-recommended',
  ],
  rules: {
    'no-console': 'off',
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/html-quotes': 'off',
  },
}
