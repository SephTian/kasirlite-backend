import pool from '../../config/db';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt';

export async function checkAccount(email: string) {
  const query = `
    SELECT u.id, u.name, u.email, u.password, r.name AS role
    FROM "user" AS u
    LEFT JOIN "role" AS r ON r.id = u.role_id
    WHERE u.email = $1`;
  const values = [email];
  const user = await pool.query(query.trim(), values);

  return user.rows[0];
}

export async function checkPassword(userPassword: string, dbPassword: string) {
  const match = await bcrypt.compare(userPassword, dbPassword);

  return match;
}

type data = {
  id: number;
  name: string;
  email: string;
  role: string;
};
export function formattingUserData(userData: data) {
  const d_id = userData.id;
  const d_name = userData.name;
  const d_email = userData.email;
  const d_role = userData.role;
  const accessToken = generateToken(d_id, d_email);
  const data = {
    user: {
      accessToken,
      name: d_name,
      email: d_email,
      role: d_role,
    },
  };

  return data;
}
