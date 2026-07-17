# easypit

Мобильное приложение для автомоек: поиск мойки, выбор услуг и запись на свободное время.

React Native 0.86 (bare, `@react-native-community/cli`) + TypeScript.

## Запуск

```sh
npm start          # Metro
npm run ios        # iOS (поды уже установлены)
npm run android    # Android
```

Проверки:

```sh
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # jest
```

Если правили нативные зависимости — переустановить поды:

```sh
cd ios && LANG=en_US.UTF-8 pod install
```

`LANG` нужен, иначе CocoaPods падает с `Unicode Normalization not appropriate for ASCII-8BIT`.

## Структура

```
src/
  api/          axios-инстанс, интерсепторы, эндпоинты, нормализация ошибок
    generated/  сюда orval кладёт клиент из OpenAPI (руками не трогаем)
  app/          входная точка: провайдеры + навигация
    navigation/ root-navigator (стек + гейт авторизации), tab-navigator
  assets/       иконки .svg (импортируются как компоненты)
  modules/      бизнес-логика по доменам: auth, wash, booking
  screens/      экраны, каждый — <name>/ui/<name>-screen.tsx + index.ts
  shared/       ui-примитивы, config (тема), lib (query-client, форматтеры), types
```

Правило зависимостей: `app` → `screens` → `modules` → `shared`/`api`.
Модули друг о друге знают только через публичный `index.tsx`.

Алиас `@/*` → `src/*` (настроен в `babel.config.js` и `tsconfig.json`).

## Библиотеки

| Что | Где настроено |
| --- | --- |
| axios | `src/api/api.ts` — токен через интерсептор, 401 сбрасывает сессию |
| TanStack Query | `src/shared/lib/query-client.ts`, провайдер в `src/app/index.tsx` |
| zustand | `src/modules/auth/store/auth-store.ts` — сессия |
| formik + yup | `src/modules/*/forms/`, мост к инпутам — `src/shared/ui/formik-field.tsx` |
| react-native-svg | иконки в `src/assets/icons`, трансформер в `metro.config.js` |
| react-navigation | `src/app/navigation/` |

## Тема и шрифты

Дизайн-токены сняты с панели **business.easypit.kz** (Mantine-тема) и живут в
`src/shared/config/theme.ts`:

- Палитра: тёмный графит `#23292e` (основное действие) + лаймовый акцент
  `#b9df33` (CTA «Записаться») на тёплом молочном фоне `#fafaf7`.
- Радиусы: базовый 14 (кнопки, инпуты), как на сайте.
- Статусы: успех `#0b5836`, ошибка `#c22020`, предупреждение `#F08C00`.

Шрифты (в `src/assets/fonts`, ссылаемся по PostScript-имени):

- **Manrope** — текст (`Manrope-Regular/Medium/SemiBold/Bold/ExtraBold`).
- **Bricolage Grotesque** — заголовки (`BricolageGrotesque-SemiBold/Bold/ExtraBold`).

Статические начертания сгенерированы из вариативных TTF (google/fonts) через
fonttools и подключены нативно (`react-native.config.js` + `npx react-native-asset`
прописал их в iOS `Info.plist` и Android `assets/fonts`).

Использовать шрифты: через `typography`/`fonts` из `@/shared/config` или готовые
`AppText` / `Heading` из `@/shared/ui`. Кнопки — варианты `primary` (графит),
`accent` (лайм), `secondary`, `ghost`.

> После добавления новых шрифтов: положить `.ttf` в `src/assets/fonts`, выполнить
> `npx react-native-asset`, затем пересобрать нативное приложение.

## Данные

Бэкенда пока нет: `API_CONFIG.useMocks` в `src/api/config.ts` включает фикстуры
из `mocks.ts` каждого модуля. Тестовый код входа — `0000`, телефон любой.

Когда появится API: выставить `useMocks: false` и заменить `baseURL`.
Для кодогенерации клиента — `npm i -D orval && npm run api:generate`
(конфиг в `src/api/generator.js`).

## Известные ограничения

- Сессия живёт в памяти: после перезапуска нужен повторный вход.
  Для persist — подключить `@react-native-async-storage/async-storage`
  и обернуть стор в `persist` из `zustand/middleware`.
