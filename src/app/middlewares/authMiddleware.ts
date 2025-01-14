// authMiddleware.js
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function authProtect(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({
      status: 'failed',
      message: 'not authorized',
      data: {},
    });
    return;
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY as string);
    next();
  } catch (error) {
    res.status(401).json({ status: 'failed', message: 'invalid token', data: {} });
  }
}
