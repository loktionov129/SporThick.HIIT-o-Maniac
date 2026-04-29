# SporThick.HIIT-o-Maniac

Веб‑приложение для HIIT‑тренировок, оптимизированное для использования на мобильных устройствах (в т. ч. на iPhone через браузер). Приложение работает в офлайн‑режиме и публикуется на GitHub Pages.

## Функционал

* **Список тренировок** с возможностью ручной сортировки (drag‑and‑drop) и поиска по названию тренировки или упражнения.
* **Создание и редактирование тренировок:**
    * добавление и удаление упражнений;
    * настройка времени выполнения каждого упражнения (в секундах);
    * установка количества кругов (включая бесконечный режим).
* **Экран тренировки:**
    * крупный обратный отсчёт таймера с цветовой индикацией (зелёный/жёлтый/красный);
    * прогресс‑бар, заполняющийся по мере отсчёта;
    * отображение статуса: «Упражнение X/Y», «Круг X/Y»;
    * звуковые сигналы для разных этапов тренировки (старт упражнения, конец упражнения, конец круга, завершение тренировки).
* **Оффлайн‑режим:** работа приложения без интернета после первой загрузки (PWA).
* **Адаптивный дизайн:** поддержка портретной и альбомной ориентации, оптимизация для смартфонов и планшетов.
* **Сохранение прогресса:** автоматическое сохранение состояния тренировки каждые 2 секунды в LocalStorage.
* **PWA‑функционал:** возможность «установить» приложение на экран «Домой» iPhone для полноэкранного режима работы.

## Технологии

* **Фреймворк:** React 18+ с Vite и TypeScript 5+.
* **Язык программирования:** TypeScript 5+ (статическая типизация).
* **Управление состоянием:** Zustand (с полной поддержкой TypeScript).
* **Маршрутизация:** React Router Dom.
* **Стилизация:** Tailwind CSS.
* **Хранение данных:** LocalStorage.
* **Оффлайн‑работа:** Vite PWA Plugin + Service Worker.
* **Сборка и деплой:** Vite + GitHub Actions → GitHub Pages.
* **Звуковые сигналы:** встроенный Audio API браузера.

## Структура проекта

```
SporThick.HIIT-o-Maniac/
├── src/
│   ├── components/           # Переиспользуемые компоненты UI
│   │   ├── WorkoutList.tsx     # Список тренировок с drag‑and‑drop
│   │   ├── TimerDisplay.tsx   # Экран таймера с прогресс‑баром
│   │   └── SearchBar.tsx     # Строка поиска
│   ├── pages/              # Основные экраны приложения
│   │   ├── Home.tsx          # Главный экран (список тренировок)
│   │   ├── CreateEditWorkout.tsx # Экран создания/редактирования тренировки
│   │   └── WorkoutScreen.tsx  # Экран тренировки с таймером
│   ├── store/              # Управление состоянием (Zustand)
│   │   └── useWorkoutStore.ts # Хук для работы с тренировками и настройками
│   ├── utils/              # Вспомогательные функции
│   │   ├── soundManager.ts    # Управление звуковыми сигналами
│   │   └── dataManager.ts     # Работа с LocalStorage
│   ├── types/              # TypeScript-типы
│   │   └── index.ts          # Централизованное описание интерфейсов
│   ├── assets/             # Статические ресурсы
│   │   ├── icons/           # Иконки для PWA (192×192, 512×512)
│   │   └── sounds/          # Аудиофайлы для сигналов
│   ├── App.tsx            # Главный компонент приложения (маршрутизация)
│   └── main.tsx           # Точка входа приложения
├── public/
│   ├── manifest.json      # Манифест PWA
│   └── sw.js             # Service Worker (генерируется автоматически)
├── vite.config.ts       # Конфигурация Vite и PWA Plugin
├── package.json
└── README.md
```

## Типы данных (TypeScript)

**Интерфейсы:**

```typescript
interface Exercise {
  id: string;
  name: string;
  duration: number; // в секундах
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  rounds: number; // 0 = бесконечность
}

interface AppState {
  workouts: Workout[];
  settings: {
    soundEnabled: boolean;
  };
}
```

**Workout:**
* `id`: UUID (генерируется через `crypto.randomUUID()`);
* `name`: string;
* `exercises`: Exercise[];
* `rounds`: number (0 = бесконечность).

**Exercise:**
* `id`: string;
* `name`: string;
* `duration`: number (в секундах).

**Settings:**
* `soundEnabled`: boolean (включение/выключение звуковых сигналов).

## Сборка и деплой через GitHub Actions

1. Закоммитьте изменения в ветку `main`.
2. Перейдите в репозиторий GitHub → вкладка **Actions**.
3. Дождитесь завершения workflow.
4. Проверьте логи сборки — приложение будет опубликовано на GitHub Pages по адресу: `https://<username>.github.io/SporThick.HIIT-o-Maniac`.
5. После деплоя откройте ссылку в браузере и установите PWA на экран «Домой» (Safari → «Поделиться» → «На экран „Домой“»).

## Запуск локально

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите разработку:
   ```bash
   npm run dev
   ```
3. Откройте `http://localhost:3000` в браузере.

4. Для проверки TypeScript‑типов:
   ```bash
   npm run type-check
   ```

## Тестирование ключевых сценариев

1. **Установка PWA** на iPhone (Safari → «Поделиться» → «На экран „Домой“»).
2. **Работа таймера** при заблокированном экране.
3. **Drag‑and‑drop** на сенсорных устройствах.
4. **Фильтрация** по названию упражнения.
5. **Восстановление тренировки** после закрытия браузера.
6. **Смена ориентации экрана** во время отсчёта.
7. **Звуковые сигналы** на iPhone.
8. **Оффлайн‑режим** после первой загрузки.
9. **Проверка типов** TypeScript во время разработки и сборки.

## Следующие шаги разработки

1. Добавить экспорт/импорт тренировок в JSON‑файл.
2. Реализовать предустановленные шаблоны тренировок (HIIT 30/30, Tabata и т. д.).
3. Добавить статистику тренировок (история завершённых сессий).
4. Реализовать тёмную/светлую тему.
5. Добавить поддержку клавиатуры для десктопа (пробел — старт/пауза, Enter — пропустить).
6. Улучшить обработку ошибок TypeScript в CI/CD‑пайплайне.

---

## Пояснения к ключевым файлам

**useWorkoutStore.ts:**
* управляет состоянием тренировок и настроек через Zustand;
* обеспечивает CRUD‑операции для тренировок и упражнений с TypeScript‑типизацией;
* синхронизирует данные с LocalStorage;
* предоставляет селекторы для компонентов UI.

**soundManager.ts:**
* загружает аудиофайлы для сигналов;
* воспроизводит звуки в зависимости от этапа тренировки;
* учитывает настройку `soundEnabled`;
* типизирован TypeScript.

**dataManager.ts:**
* валидирует данные перед сохранением в LocalStorage;
* обрабатывает ошибки LocalStorage (переполнение, отключён);
* реализует бэкап и восстановление данных;
* использует TypeScript‑типы для проверки структуры.

**types/index.ts:**
* централизованно описывает все интерфейсы приложения (Workout, Exercise, AppState и др.);
* облегчает поддержку и рефакторинг кода;
* позволяет переиспользовать типы в разных модулях.

**manifest.json:**
* содержит метаданные PWA (название, иконки, цвет темы, режим отображения);
* настраивает полноэкранный режим (`standalone`).

**README.md:**
* даёт общее описание проекта;
* перечисляет текущий функционал и планы на будущее;
* описывает технологический стек;
* документирует структуру проекта и модели данных;
* содержит инструкции по сборке, деплою и тестированию;
* служит отправной точкой для новых разработчиков.

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
