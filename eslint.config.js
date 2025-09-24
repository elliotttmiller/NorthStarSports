import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import next from "eslint-plugin-next";

export default [
  {
    ...(() => {
      const { meta, configs, ...rest } = js;
      return rest;
    })(),
    languageOptions: {
      ...js.languageOptions,
      parserOptions: { ecmaVersion: 2021, sourceType: "module" },
    },
  },
  {
    files: ["frontend/src/**/*.{ts,tsx,js,jsx}", "frontend/app/**/*.{ts,tsx,js,jsx}"],
    ignores: ["vite.config.ts", "next-env.d.ts", "**/*.d.ts", ".next/**", "node_modules/**", "public/**", "dist/**", "build/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./frontend/tsconfig.json",
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      next,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
