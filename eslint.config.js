import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import vitest from "eslint-plugin-vitest";

export default [
  { ignores: ["dist", "node_modules"] }, // Игнорируем скомпилированные файлы и зависимости
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Добавляем поддержку TypeScript, если понадобится
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Добавляем глобальные переменные Node.js
        ...vitest.environments.env.globals, // Добавляем глобальные переменные Vitest
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      vitest,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }], // Игнорируем неиспользуемые переменные с заглавными буквами
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...vitest.configs.recommended.rules, // Включаем рекомендованные правила Vitest
    },
  },
];
