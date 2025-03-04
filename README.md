Чтобы установить и настроить React Testing Library для Vite, выполните следующие шаги:

### 1. **Установите зависимости**

В терминале введите:

```sh
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Здесь:

- `vitest` — тестовый фреймворк, который встроен в Vite
- `@testing-library/react` — сама библиотека для тестирования компонентов React
- `@testing-library/jest-dom` — дополнительные матчеры для Jest (например, `toBeInTheDocument()`)
- `jsdom` — виртуальный DOM для тестирования React-компонентов

---

### 2. **Настройте `vite.config.ts`**

Откройте `vite.config.ts` и добавьте поддержку Vitest:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
```

- `globals: true` — позволяет использовать `describe`, `it`, `expect` без импортов
- `environment: 'jsdom'` — чтобы тесты могли работать с DOM
- `setupFiles: './src/setupTests.ts'` — указываем файл с настройками

---

### 3. **Создайте `setupTests.ts`**

Создайте файл `src/setupTests.ts` и добавьте:

```ts
import "@testing-library/jest-dom";
```

Теперь вы сможете использовать расширенные матчеры, например:

```ts
expect(element).toBeInTheDocument();
```

---

### 4. **Напишите тест**

---

### 5. **Запустите тесты**

В `package.json` добавьте команду:

```json
"scripts": {
  "test": "vitest"
}
```

Запуск:

```sh
npm test
```

или в режиме наблюдения:

```sh
npm run test -- --watch
```

Теперь у вас React Testing Library работает в Vite! 🚀

В ESLint 9+ используется новый формат конфигурации (Flat Config), и плагины импортируются немного иначе. Давай исправим ошибку.

---

## **1. Установите плагин для Vitest**

Если еще не установлен:

```sh
npm install --save-dev eslint-plugin-vitest
```

---

## **2. Обновите `eslint.config.js`**

Используйте `import vitest from "eslint-plugin-vitest"`:

```js
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
```

---

## **3. Перезапустите ESLint**

После внесения изменений попробуйте:

```sh
npx eslint --fix .
```

Если ESLint запущен в фоновом режиме (например, в редакторе), перезапустите его.

Теперь `expect`, `test`, `describe` и другие функции Vitest не будут вызывать ошибки в ESLint. 🚀
