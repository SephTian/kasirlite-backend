import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export function generateToken(id: number, email: string) {
  return sign({ id, email }, process.env.SECRET_KEY as string, { expiresIn: '7d' });
}
