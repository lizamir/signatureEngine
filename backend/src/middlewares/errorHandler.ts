import { Request, Response, NextFunction } from 'express';
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'internal Server Error';
  res.status(status).json({ error: message });
};
