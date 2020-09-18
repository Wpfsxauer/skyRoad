module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": 0,
    "no-debugger": 1,
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "no-multiple-empty-lines": [2, {
      "max": 1
    }],
    "key-spacing": [1, {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }],
    "no-multi-spaces": 2,
    "block-scoped-var": 2,
    "no-unreachable": 2,
    "comma-dangle": [2, "never"],
    "no-redeclare": [2, {
      "builtinGlobals": true
    }],
    "eqeqeq": 0,
    "default-case": 2,
    "no-duplicate-case": 2,
    "no-fallthrough": 2,
    "complexity": ["error", {
      "max": 20
    }],
    "no-const-assign": "error",
    "no-duplicate-imports": "error",
    "no-alert": 2,
    "no-undef": 2,
    "no-labels": 2,
    "no-eq-null": 2,
    "no-var": 2,
    "max-params": ["error", 5],
    "max-statements": ["error", 30],
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-empty": 2,
    "no-loop-func": 2,
    "no-delete-var": 2,
    "no-unused-vars": 2,
    "no-else-return": 2,
    "no-lonely-if": 2,
    "no-shadow-restricted-names": 2,
    "for-direction": 'error',
    "require-await": "error",
    "require-yield": "error",
    "arrow-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "array-bracket-newline": ["error", {
      "multiline": false,
      "minItems": 3
    }],
    "array-element-newline": ["error", {
      "minItems": 3
    }],
    "no-sparse-arrays": 2,
    "array-callback-return": "error",
    "object-curly-newline": ["error", {
      "ObjectExpression": "always",
      "ObjectPattern": "always" 
    }],
    "object-property-newline": 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true
    }
  }]
}
