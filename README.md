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

## API-клиент (orval)

Типизированный клиент и react-query хуки генерируются из OpenAPI-схемы
`https://api.easypit.kz/openapi/schema/` (JU / Easypit Client API, 77 эндпоинтов).

```sh
npm run api:schema     # обновить локальную копию src/api/openapi.yaml с сервера
npm run api:generate   # сгенерировать клиент в src/api/generated
```

Как устроено:

- Конфиг — `orval.config.js` (режим `tags-split`, клиент `react-query`).
- Все запросы идут через `customInstance` из `src/api/mutator.ts` → наш axios
  `api` с JWT-интерсептором и обработкой 401 (базовый URL — `src/api/config.ts`).
- `src/api/openapi-transformer.js` чинит nullable-enum от drf-spectacular
  (`oneOf: [Enum, BlankEnum, NullEnum]`) — иначе orval падает на дубликатах имён.
- Всё в `src/api/generated/**` перезаписывается генератором и исключено из eslint
  (`.eslintignore`) — руками не редактируем.

Использование — импорт хука из нужного тега, напр.:

```ts
import { useCarwashCarwashesList } from '@/api/generated/carwashes/carwashes';
```

## Данные и моки

Экраны пока работают на фикстурах: `API_CONFIG.useMocks` в `src/api/config.ts`
включает `mocks.ts` каждого модуля (тестовый код входа — `0000`, телефон любой).
Реальный бэкенд уже доступен — по мере готовности переключаем модули на
сгенерированные хуки и ставим `useMocks: false`.

## Известные ограничения

- Сессия живёт в памяти: после перезапуска нужен повторный вход.
  Для persist — подключить `@react-native-async-storage/async-storage`
  и обернуть стор в `persist` из `zustand/middleware`.
