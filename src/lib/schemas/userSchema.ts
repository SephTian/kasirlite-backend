import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string({ required_error: 'Email harus diisi' }).email('Email atau password salah'),
  password: z.string({ required_error: 'Password harus diisi' }).nonempty('Password tidak boleh kosong'),
});
