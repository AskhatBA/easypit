/**
 * Конфиг кодогенерации клиента из OpenAPI-схемы бэкенда.
 *
 * Требует orval, он ставится отдельно (в проекте пока не установлен):
 *   npm i -D orval
 *   npm run api:generate
 *
 * Всё, что попадает в ./generated, перезаписывается генератором —
 * руками там ничего не правим.
 */
module.exports = {
  easypit: {
    input: {
      target: process.env.EASYPIT_OPENAPI_URL ?? 'https://api.easypit.app/v1/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated/endpoints.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/api/api.ts',
          name: 'api',
        },
      },
    },
  },
};
