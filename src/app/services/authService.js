import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.js';

export async function checkAccount(email) {
  const query = `
    SELECT u.id, u.name, u.email, u.password, r.name AS role
    FROM "user" AS u
    LEFT JOIN "role" AS r ON r.id = u.role_id
    WHERE u.email = $1`;
  const values = [email];
  const user = await pool.query(query.trim(), values);

  return user.rows[0];
}

export async function checkPassword(userPassword, dbPassword) {
  const match = await bcrypt.compare(userPassword, dbPassword);

  return match;
}

export function formattingUserData(userData) {
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
