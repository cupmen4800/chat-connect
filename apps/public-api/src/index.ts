import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { router } from './routes/index';

const app = new OpenAPIHono();

app.route('/', router);

const port = 3003;

serve({
  fetch: app.fetch,
  port,
});
