import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.js';

export async function login(req, res) {
  const { email, password } = req.body;

  //Jika tidak ada email maka error
  if (!email) {
    return res.status(400).json({ status: 'failed', message: 'Email tidak boleh kosong', data: '' });
  }

  //Jika tidak ada password maka error
  if (!password) {
    return res.status(400).json({ status: 'failed', message: 'Password tidak boleh kosong', data: '' });
  }

  try {
    const query = `
    SELECT u.id, u.name, u.email, u.password, r.name AS role
    FROM "user" AS u
    LEFT JOIN "role" AS r ON r.id = u.role_id
    WHERE u.email = $1`;
    const values = [email];
    const user = await pool.query(query.trim(), values);

    //Jika user tidak ditemukan
    if (user.rows.length === 0) {
      return res.status(401).json({ status: 'failed', message: 'Email tidak ditemukan', data: '' });
    }

    //Jika password salah
    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      return res.status(401).json({
        status: 'failed',
        message: 'Email atau Password salah',
        data: '',
      });
    }

    const d_id = user.rows[0].id;
    const d_name = user.rows[0].name;
    const d_email = user.rows[0].email;
    const d_role = user.rows[0].role;
    const accessToken = generateToken(d_id, d_email);
    const data = {
      user: {
        accessToken,
        name: d_name,
        email: d_email,
        role: d_role,
      },
    };

    return res.status(200).json({ status: 'ok', message: 'Success Login', data });
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: 'Server Error', data: error.message });
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
