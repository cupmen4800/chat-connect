import { z } from '@hono/zod-openapi';

export const helloEntitySchema = z
  .object({
    id: z.string().nanoid().openapi({
      example: 'nanoId',
    }),
    name: z.string().openapi({
      param: {
        name: 'name',
        in: 'path',
      },
      example: 'John Doe',
    }),
  })
  .openapi('HelloSchema');

export const helloListEntitySchema = z
  .array(helloEntitySchema)
  .openapi('HelloListSchema');

export type helloEntity = Readonly<z.infer<typeof helloEntitySchema>>;

export type helloListEntity = Readonly<z.infer<typeof helloListEntitySchema>>;

export const helloEntityGetPropsSchema = helloEntitySchema
  .pick({ name: true })
  .extend({
    name: z.string().openapi({
      param: {
        name: 'name',
        in: 'path',
      },
      example: 'John Doe',
    }),
  });

export type helloEntityGetProps = Readonly<
  z.infer<typeof helloEntityGetPropsSchema>
>;

export const helloEntityPostSchema = helloEntitySchema
  .pick({ name: true })
  .extend({
    name: z.string().openapi({
      param: {
        name: 'name',
        in: 'path',
      },
      example: 'John Doe',
    }),
  })
  .openapi('CreateHelloSchema');

export type helloEntityPostProps = Readonly<
  z.infer<typeof helloEntityPostSchema>
>;
