import { checkAccount, checkPassword, formattingUserData } from '../services/authService.js';

export async function login(req, res) {
  const { email, password } = req.body;

  //Jika tidak ada email maka error
  if (!email) {
    return res.status(400).json({ status: 'failed', message: 'Email tidak boleh kosong', data: {} });
  }

  //Jika tidak ada password maka error
  if (!password) {
    return res.status(400).json({ status: 'failed', message: 'Password tidak boleh kosong', data: {} });
  }

  try {
    const user = await checkAccount(email);

    //Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({ status: 'failed', message: 'Email atau Password salah', data: {} });
    }

    //Jika password salah
    const match = await checkPassword(password, user.password);
    if (!match) {
      return res.status(401).json({ status: 'failed', message: 'Email atau Password salah', data: {} });
    }

    const data = formattingUserData(user);

    return res.status(200).json({ status: 'ok', message: 'Berhasil Login', data });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message, data: {} });
  }
}

export async function register(req, res) {
  try {
    // const users = await User.find();
    res.status(200).json({ status: 200, message: 'Success Register', data: '' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Server Error', data: '' });
  }
}
