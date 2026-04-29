# SporThick.HIIT-o-Maniac

Приложение для HIIT‑тренировок с синхронизацией между iPhone и Apple Watch.

## Функционал (Hello World → основа для будущего приложения)

**iOS:**
* список тренировок;
* создание и редактирование тренировок;
* просмотр упражнений в тренировке;
* синхронизация с Apple Watch через Bluetooth (WatchConnectivity).

**watchOS:**
* отображение списка тренировок (синхронизируется с iPhone);
* запуск тренировок на Apple Watch;
* обратный отсчёт таймера для текущего упражнения;
* отображение прогресса: упражнение X/Y, круг X/Y.

## Технологии

* **Язык:** Swift 5.7+
* **UI‑фреймворк:** SwiftUI
* **Синхронизация:** WatchConnectivity
* **Хранение данных:** UserDefaults
* **Сборка:** GitHub Actions (macOS‑раннеры)

## Структура проекта

```
SporThick.HIIT-o-Maniac/
├── SporThick/                  # iOS‑приложение
│   ├── Views/
│   │   ├── ContentView.swift     # Главный экран iOS
│   │   └── WorkoutListView.swift # Список тренировок
│   ├── Models/
│   │   ├── Workout.swift         # Модель тренировки
│   │   └── Exercise.swift       # Модель упражнения
│   ├── SporThickApp.swift    # Точка входа приложения
│   └── Assets.xcassets/       # Ресурсы
├── SporThickWatch/           # watchOS‑приложение (интерфейс)
│   ├── Views/
│   │   ├── ContentView.swift     # Главный экран Watch
│   │   └── WorkoutListRow.swift # Строка списка тренировок
│   ├── SporThickWatchApp.swift # Точка входа Watch App
│   └── Assets.xcassets/
├── SporThickWatchExtension/  # Логика watchOS
│   ├── Controllers/
│   │   └── WorkoutController.swift # Управление тренировкой
│   └── ExtensionDelegate.swift
├── .github/
│   └── workflows/
│       └── build.yml           # GitHub Actions workflow
└── README.md
```

## Модели данных

**Workout:**
* `id`: UUID;
* `name`: String;
* `exercises`: [Exercise];
* `rounds`: Int (1 = бесконечность).

**Exercise:**
* `id`: UUID;
* `name`: String;
* `duration`: Int (в секундах).

## Сборка через GitHub Actions

1. Закоммитьте изменения в ветку `main`.
2. Перейдите в репозиторий GitHub → вкладка **Actions**.
3. Дождитесь завершения workflow.
4. Проверьте логи сборки — приложение будет собрано для:
   * iPhone 13 mini (симулятор);
   * Apple Watch 4 Series (симулятор 40 мм).

## Следующие шаги разработки

1. Реализовать синхронизацию данных через WatchConnectivity.
2. Добавить экран создания/редактирования тренировки (iOS).
3. Реализовать экран тренировки с таймером (iOS + watchOS).
4. Добавить тактильную обратную связь (haptic) для watchOS.
5. Улучшить дизайн в соответствии с HIG.

---

## Пояснения к файлам

**WorkoutController.swift:**
* реализует логику управления тренировкой: старт, пауза, пропуск упражнения, остановка;
* отслеживает прогресс: текущее упражнение, круг, оставшееся время;
* использует `Timer` для обратного отсчёта;
* обрабатывает переходы между упражнениями и кругами;
* предоставляет публичный API для View‑слоя;
* включает расширение `Array` с безопасным доступом к элементам (`safe`).

**README.md:**
* даёт общее описание проекта;
* перечисляет текущий функционал и планы на будущее;
* описывает технологический стек;
* документирует структуру проекта и модели данных;
* содержит инструкцию по сборке через GitHub Actions;
* служит отправной точкой для новых разработчиков.