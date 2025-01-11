import pool from '../../config/db';

// Fungsi untuk mendapatkan semua pengguna
const login = async ({ email, password }: { email: string; password: string }) => {
  const result = await pool.query(`SELECT * FROM "user" WHERE email=${email} AND password=${password}`);
  return result.rows[0];
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM user');
  return result.rows;
};

// Fungsi untuk menambahkan pengguna
const addUser = async (name: string, email: string) => {
  const result = await pool.query('INSERT INTO user (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  return result.rows[0];
};

export { login, getAllUsers, addUser };
