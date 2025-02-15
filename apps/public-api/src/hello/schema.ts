import { errorSchema } from '@/common/schema/error';
import { createRoute, z } from '@hono/zod-openapi';
import { helloEntityGetPropsSchema, helloEntitySchema } from './domain/model';

export const getAllHelloRoute = createRoute({
  description: 'Getのテスト',
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(helloEntitySchema).openapi('HelloListSchema'),
        },
      },
      description: '成功',
    },
    404: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: '404エラー',
    },
    500: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: 'サーバーエラー 500',
    },
  },
});

export const getHelloRoute = createRoute({
  description: 'Getのテスト',
  method: 'get',
  path: '/{name}',
  request: {
    params: helloEntityGetPropsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: helloEntitySchema,
        },
      },
      description: '成功',
    },
    404: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: '404エラー',
    },
    500: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: 'サーバーエラー 500',
    },
  },
});

export const postHelloRoute = createRoute({
  description: 'Postのテスト',
  method: 'post',
  path: '/',
  request: {
    body: {
      content: { 'application/json': { schema: helloEntityGetPropsSchema } },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: helloEntitySchema,
        },
      },
      description: '成功',
    },
    400: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: 'バリデーションエラーやユニーク制約違反など',
    },
    404: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: '404エラー',
    },
    500: {
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
      description: 'サーバーエラー 500',
    },
  },
});
