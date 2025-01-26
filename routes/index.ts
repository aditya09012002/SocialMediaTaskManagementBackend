/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, Request, Response, NextFunction } from 'express';
import version1_routes from './versions/v1';

const routes = (app: Application): void => {
  app.use('/api/v1', version1_routes);
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as Error & {
      statusCode?: number;
    };
    err.statusCode = 404;
    next(err);
  });

  app.use(
    (
      err: Error & { statusCode?: number; status?: string; error: boolean },
      req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      err.error = true;
      err.status = err.status || 'ERROR';
      err.statusCode = err.statusCode || 500;

      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    },
  );
};

export default routes;
