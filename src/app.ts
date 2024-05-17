import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { studentRoute } from './app/modules/student/student.route';
import { globalErrorHandler } from './lib';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('server is running 🚀');
});

// application routes
app.use('/api/v1/students', studentRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

app.use(globalErrorHandler);

export default app;
