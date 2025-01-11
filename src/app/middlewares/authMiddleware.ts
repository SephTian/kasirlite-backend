// authMiddleware.js
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Not Authorized' });
    return;
  }

  // try {
  //   req.user = verify(token, process.env.JWT_SECRET as string);
  //   next();
  // } catch (error) {
  //   res.status(401).json({ error: 'Invalid Token' });
  // }
}
