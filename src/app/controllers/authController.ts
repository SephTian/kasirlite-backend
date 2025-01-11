import { checkAccount, checkPassword, formattingUserData } from '../services/authService';
import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  //Jika tidak ada email maka error
  if (!email) {
    res.status(400).json({ status: 'failed', message: 'Email tidak boleh kosong', data: {} });
    return;
  }

  //Jika tidak ada password maka error
  if (!password) {
    res.status(400).json({ status: 'failed', message: 'Password tidak boleh kosong', data: {} });
    return;
  }

  try {
    const user = await checkAccount(email);

    //Jika user tidak ditemukan
    if (!user) {
      res.status(401).json({ status: 'failed', message: 'Email atau Password salah', data: {} });
      return;
    }

    //Jika password salah
    const match = await checkPassword(password, user.password);
    if (!match) {
      res.status(401).json({ status: 'failed', message: 'Email atau Password salah', data: {} });
      return;
    }

    const data = formattingUserData(user);

    res.status(200).json({ status: 'ok', message: 'Berhasil Login', data });
    return;
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}

export async function register(req: Request, res: Response) {
  try {
    // const users = await User.find();
    res.status(200).json({ status: 200, message: 'Success Register', data: '' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Server Error', data: '' });
  }
}
