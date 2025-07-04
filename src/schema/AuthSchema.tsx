import { countryCodes, currencyCodes } from '@/services/datas';
import { z } from 'zod';

export const registerSchema = z.object({
  store_name: z
    .string()
    .min(3, 'El nombre de negocio debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerStoreUserSchema = z.object({
  name_store: z.string().nonempty('El nombre de la tienda es obligatorio'),
  rubro: z.number(), //.nonempty('El rubro es obligatorio'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  surnames: z
    .string()
    .min(3, 'Los apellidos deben tener al menos 3 caracteres'),
  country: z.enum(countryCodes, {
    errorMap: () => ({ message: 'País no válido' }),
  }),
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 dígitos')
    .regex(/^\+\d{1,3}\d{7,12}$/, '...')
    .transform((val) => val.replace(/\s|-/g, '')),
  currency: z.enum(currencyCodes, {
    errorMap: () => ({ message: 'Moneda no válida' }),
  }),
});

export type RegisterStoreUser = z.infer<typeof registerStoreUserSchema>;

export const accountSchema = z.object({
  username: z
    .string()
    .min(4, 'El nombre de usuario debe tener al menos 3 caracteres'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  surnames: z
    .string()
    .min(3, 'Los apellidos deben tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede tener más de 15 dígitos')
    .regex(
      /^\+\d{1,3}\d{7,12}$/,
      'El teléfono debe comenzar con + seguido del código de país y el número sin espacios ni caracteres especiales',
    ),
});

export type AccountFormData = z.infer<typeof accountSchema>;
