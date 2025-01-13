import { checkAccount, checkPassword } from '../services/authService';
import { Request, Response } from 'express';
import { loginUserSchema } from '../../lib/schemas/userSchema';
import { generateToken } from '../../utils/jwt';

export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginUserSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(400).json({
        status: 'failed',
        message: validatedData.error.errors[0].message,
        data: {},
      });
      return;
    }
    const { email, password } = validatedData.data;

    const user = await checkAccount(email);

    //Jika user tidak ditemukan
    if (!user) {
      res.status(401).json({ status: 'failed', message: 'Email atau password salah', data: {} });
      return;
    }

    //Jika password salah
    const match = await checkPassword(password, user.password);
    if (!match) {
      res.status(401).json({ status: 'failed', message: 'Email atau password salah', data: {} });
      return;
    }

    const accessToken = generateToken(user.id, user.email);

    res.status(200).json({ status: 'ok', message: 'Berhasil Login', data: { id: user.id, name: user.name, email: user.email, role: user.role?.name, accessToken } });
    return;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'failed',
        message: e.message,
        data: {},
      });
      return;
    }

    res.status(500).json({ status: 'failed', message: 'Internal server error', data: {} });
    return;
  }
}

// export async function register(req: Request, res: Response) {
//   try {
//     // const users = await User.find();
//     res.status(200).json({ status: 200, message: 'Success Register', data: '' });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: 'Server Error', data: '' });
//   }
// }
