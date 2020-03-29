module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    "prettier"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest',
    'react-hooks',
    'prettier'
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
          "printWidth": 80,
          "trailingComma": "es5",
          "semi": false,
          "jsxSingleQuote": true,
          "singleQuote": true,
          "useTabs": true
      }
    ],
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": "warn"
  }
}
