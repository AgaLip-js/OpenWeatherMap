const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;

module.exports = {
  env: {
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        // sourceType: "module",
      },

      plugins: ["@typescript-eslint"],
      rules: Object.assign(typescriptEslintRecommended.rules, {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/member-delimiter-style": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "no-use-before-define": "off",
        camelcase: "off",
        "@typescript-eslint/camelcase": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
      }),
    },
  ],
  rules: {
    "max-len": [
      "error",
      {
        code: 200,
      },
    ],
    "no-restricted-syntax": ["error"],
    "no-lonely-if": 0,
    allowElseIf: 0,
    "prefer-template": 2,
    "default-case": 2,
    "no-mixed-operators": 1,
    "no-confusing-arrow": 0,
    "no-new": 0,
    "no-undef": 2,
    "no-bitwise": 1,
    "import/no-unresolved": [
      1,
      {
        ignore: [".+/components/.+"],
      },
    ],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "space-infix-ops": [
      "error",
      {
        int32Hint: false,
      },
    ],
    "func-call-spacing": ["error", "never"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
      },
    ],
    "arrow-parens": [
      2,
      "as-needed",
      {
        requireForBlockBody: true,
      },
    ],
    "no-nested-ternary": "warn",
    "no-multiple-empty-lines": [
      "warn",
      {
        max: 1,
      },
    ],
    "require-atomic-updates": "error",
    radix: ["error", "as-needed"],
    "react/prop-types": [1],
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "react/require-default-props": [0],
    "no-console": [1],
    "prefer-const": "error",
    "react/forbid-prop-types": [1],
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-quotes": 0,
    quotes: 0,
    "import/no-extraneous-dependencies": 0,
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "max-params": ["error", 7],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: "always",
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: "never",
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    "no-plusplus": [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "no-submodule-imports": 0,
    "import/extensions": 0,
    "max-classes-per-file": ["error", 2],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "default-param-last": "off",
    "react/no-unstable-nested-components": [
      "warn",
      {
        allowAsProps: true,
      },
    ],
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [0],
  },
};
