module.exports = {

  darkMode: 'class',

  content: [
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
    './pages/**/*.{js,ts,vue}',
  ],

  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      }
    }
  },
}
