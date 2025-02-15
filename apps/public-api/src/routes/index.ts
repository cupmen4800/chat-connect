import { OpenAPIHono } from '@hono/zod-openapi';
import { helloApp } from '../hello/service';
import { swaggerUI } from '@hono/swagger-ui';

export const router = new OpenAPIHono();

router.route('/hello', helloApp);

// Swagger ドキュメント

router.doc('/docs', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Tracon API',
  },
});

router.get('/docs-ui', swaggerUI({ url: '/docs' }));
