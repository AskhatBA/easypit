/**
 * Кодогенерация типизированного клиента и react-query хуков из OpenAPI-схемы.
 *
 *   npm run api:schema    # обновить локальную openapi.yaml с сервера
 *   npm run api:generate  # сгенерировать клиент в src/api/generated
 *
 * Всё в src/api/generated перезаписывается генератором — руками не правим.
 * Запросы идут через customInstance (src/api/mutator.ts) → наш axios с JWT.
 */
module.exports = {
  easypit: {
    input: {
      // Локальная копия схемы, чтобы генерация была воспроизводимой (в т.ч. в CI).
      target: './src/api/openapi.yaml',
      // Чинит nullable-enum от drf-spectacular (иначе дубликаты имён схем).
      override: {
        transformer: './src/api/openapi-transformer.js',
      },
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated/endpoints.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          // Отмена запросов реализована в mutator через CancelToken.
          signal: false,
        },
      },
    },
  },
};
