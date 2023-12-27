import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

export const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().email().endsWith('@redberry.ge'),
    description: zod.string().min(4),
    title: zod.string().min(4),
    author: zod
      .string()
      .min(4, { message: 'მინიმუმ 4 სიმბოლო' })

      .refine(
        (value) => {
          const words = value.trim().split(' ')
          return words.length === 2
        },
        {
          message: 'მინიმუმ 2 სიტყვა'
        }
      ),
    publish_date: zod.string(),
    categories: zod.array(zod.number()),
    image: zod.any()
  })
)
