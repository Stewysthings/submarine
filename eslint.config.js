// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-x": reactX,
      "react-dom": reactDom,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...reactX.configs["recommended-typescript"]?.rules,
      ...reactDom.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // keep this disabled
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
