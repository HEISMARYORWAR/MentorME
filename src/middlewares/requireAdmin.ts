import { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
