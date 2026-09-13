export default [
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: { console: "readonly" },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      eqeqeq: ["error", "always"],
    },
  },
];
