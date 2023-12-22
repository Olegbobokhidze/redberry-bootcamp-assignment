import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().email().nonempty().endsWith('@redberry.ge'),
    description: zod.string().min(4).nonempty(),
    title: zod.string().min(4).nonempty(),
    author: zod
      .string()
      .min(4, { message: 'მინიმუმ 4 სიმბოლო' })
      .nonempty()
      .refine(
        (value) => {
          const words = value.trim().split(' ');
          return words.length === 2;
        },
        {
          message: 'მინიმუმ 2 სიტყვა',
        }
      ),
    date: zod.any(),
    category: zod.any(),
    image: zod.string().nonempty(),
  })
);