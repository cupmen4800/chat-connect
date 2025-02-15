import { z } from 'zod';

export const errorSchema = z
  .object({
    message: z.string().openapi({
      example: '○○が存在しません。',
    }),
  })
  .openapi('ErrorResponse');
