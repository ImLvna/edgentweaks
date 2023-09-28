// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:svelte/recommended",
    "plugin:svelte/prettier",
  ],
  ignorePatterns: ["dist/**/*", "**/*.html", "**/*.md", "src/include/**/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ...
    project: "tsconfig.json",
    extraFileExtensions: [".svelte"], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: [
        "./.eslintrc.cjs",
        "./svelte.config.js",
        "./vite.config.ts",
        "./userscripts/*",
      ],
    },
    // ...
  ],
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  rules: {
    // unused import
    "@typescript-eslint/no-unused-vars": 1,
    "prettier/prettier": 2, // Means error
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  env: {
    browser: true,
    node: true,
  },

  globals: {
    EDG_VERSION: true,
    EDG_COMMIT: true,
    EDG_AUTHOR: true,
    EDG_GITHUB_URL: true,
  },
};
