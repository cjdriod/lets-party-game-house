module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "vue/require-prop-types": 0,
    "vue/require-default-prop": 0,
    "vue/no-side-effects-in-computed-properties": 1,
    "vue/no-use-v-if-with-v-for": 1,
    "no-unused-vars": 0,
    "no-empty": 1,
    "no-undef": 1,
    "vue/require-v-for-key": 1,
    "vue/valid-v-for": 1,
    "vue/no-template-shadow": 1,
    "vue/no-unused-vars": 1,
    "vue/require-component-is": 1,
  },
}
