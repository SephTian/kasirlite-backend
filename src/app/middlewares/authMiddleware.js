// authMiddleware.js
import { verify } from 'jsonwebtoken';

export function protect(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Not Authorized' });
  }

  try {
    req.user = verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
  }
}
