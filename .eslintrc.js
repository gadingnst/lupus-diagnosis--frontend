module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'semi': 'off',
    'comma-dangle': 0,
    'no-shadow': 0,
    'react/react-in-jsx-scope': 0,
    'react-native/no-inline-styles': 0
  }
}
