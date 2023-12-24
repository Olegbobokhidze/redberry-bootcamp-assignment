import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const authValidationSchema = toTypedSchema(
  zod.object({
    email: zod.string().email().nonempty().endsWith('@redberry.ge'),
  })
);