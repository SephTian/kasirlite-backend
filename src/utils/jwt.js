// jwt.js
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export function generateToken(id, email) {
  return sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '7d' });
}
