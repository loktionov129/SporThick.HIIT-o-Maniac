# ⚡ SporThick.HIIT-o-Maniac
------------------------------
Тренируйся как маньяк, кодь как бог. 🚀
------------------------------

Maniac Mode Engaged. Профессиональное PWA-приложение для высокоинтенсивных интервальных тренировок (HIIT), упакованное в агрессивный спортивный дизайн. Оптимизировано для мобильных устройств, работает без интернета и готово к установке на ваш iPhone или Android.

## 🚀 Основные фишки

* Библиотека пресетов: Быстрый старт с готовыми шаблонами (Tabata Classic, HIIT 45/15, AMRAP и даже мемы «УТРОМ/ВЕЧЕРОМ»).
* Maniac UI/UX: Адаптивный дизайн с поддержкой Dark & Light тем. Плавные анимации на Framer Motion и «стеклянные» эффекты.
* Интерактивный Таймер: Крупная индикация, прогресс-кольца, звуковое сопровождение и блокировка сна экрана (Wake Lock).
* Smart Onboarding: Интерактивные сториз при первом входе, обучающие работе с приложением и установке PWA на iOS.
* Управление данными: Полный контроль через JSON (импорт/экспорт всей базы тренировок и истории).
* Zero-Lag Performance: Мгновенный отклик благодаря Zustand и легким компонентам.
* Offline First: Полноценное PWA. Работает в лесу, в подвале или в самолете.

## 🛠 Технологический стек

* Core: React 19 + Vite + TypeScript
* State: Zustand + Persist (автосохранение в LocalStorage)
* Styles: Tailwind CSS v4 (Custom Design Tokens)
* Animations: Framer Motion (Stories, Modals, Transitions)
* Navigation: React Router Dom v7
* Drag-n-Drop: @hello-pangea/dnd (сортировка тренировок и упражнений)
* Icons: Lucide React

## 📂 Структура проекта

```
.
src/
├── components/       # Общие UI-компоненты (Button, Card, Modal, Toast)
├── constants/        # Константы и пресеты тренировок
├── features/         # Модульная логика экранов
│   ├── workout-list/ # Главный экран и поиск
│   ├── workout-form/ # Редактор программ
│   ├── timer/        # Экран активной тренировки
│   ├── history/      # Логи завершенных сессий
│   ├── data/         # Экспорт/Импорт/Сброс
│   ├── presets/      # Библиотека шаблонов
│   └── onboarding/   # Сториз для новичков
├── store/            # Zustand сторы (Workout, Toast, Modal)
├── types/            # TypeScript определения
└── utils/            # Форматтеры времени и даты
```

## 🛠 Установка и запуск

   1. Клонирование и зависимости:
   ```
   git clone https://github.com/loktionov129/SporThick.HIIT-o-Maniac
   npm install
   ```
   
   2. Запуск в режиме разработки:
   ```
   npm run dev
   ```
   3. Сборка PWA (Production):
   ```
   npm run build
   ```
   
## 📱 Установка как PWA (iOS)

   1. Откройте приложение в Safari.
   2. Нажмите кнопку «Поделиться» (квадрат со стрелкой вверх).
   3. Выберите «На экран „Домой“».
   4. Готово! Приложение появится в списке программ и будет открываться без интерфейса браузера.
---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
