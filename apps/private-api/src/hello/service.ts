import { OpenAPIHono } from '@hono/zod-openapi';
import { getAllHelloRoute, getHelloRoute, postHelloRoute } from './schema';
import { createHello, getAllHello, getHelloByName } from './usecase';
import { Prisma } from '@prisma/client';

export const helloApp = new OpenAPIHono();

helloApp.openapi(getAllHelloRoute, async c => {
  try {
    const hello = await getAllHello();
    if (!hello[0]) {
      return c.json({ message: 'Not Found' }, 404);
    }
    return c.json(hello, 200);
  } catch (e) {
    return c.json({ message: 'サーバーエラー' }, 500);
  }
});

helloApp.openapi(getHelloRoute, async c => {
  try {
    const { name } = c.req.valid('param');
    const hello = await getHelloByName({ name });
    if (!hello) {
      return c.json({ message: 'Not Found' }, 404);
    }
    return c.json(hello, 200);
  } catch {
    return c.json({ message: 'サーバーエラー' }, 500);
  }
});

helloApp.openapi(postHelloRoute, async c => {
  try {
    const body = c.req.valid('json');
    const hello = await createHello(body);
    if (!hello) {
      return c.json({ message: 'Not Found' }, 404);
    }
    return c.json(hello, 200);
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return c.json(
          {
            message: 'この名前は既に使われています',
          },
          400,
        );
      }
    }
    return c.json(
      {
        message: 'サーバーエラー',
      },
      500,
    );
  }
});
