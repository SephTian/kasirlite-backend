import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

// IMPORTING ENV DATA
dotenv.config();

// Membuat koneksi ke database menggunakan Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

// Event listener untuk koneksi
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

export default pool;
