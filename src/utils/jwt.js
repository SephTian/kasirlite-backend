// jwt.js
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export function generateToken(id, email, role) {
  return sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '7d' });
}
