import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../Jwt.service';

export const deserializerMiddleware = (jwtService: JWTService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Not Authorized',
      });
      return;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwtService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unauthorized',
      });
    }
  };
};
