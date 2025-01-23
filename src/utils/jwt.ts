import jsonwebtoken, { verify, JwtPayload } from 'jsonwebtoken';
const { sign } = jsonwebtoken;

export function generateToken(id: number, email: string) {
  return sign({ id, email }, process.env.SECRET_KEY as string, { expiresIn: '7d' });
}

export function decodeToken(token: string) {
  return verify(token, process.env.SECRET_KEY as string) as JwtPayload;
}
