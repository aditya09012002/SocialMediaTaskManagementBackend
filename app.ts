import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index';
import morgan from 'morgan';

const corsOptions = {
  origin: ['http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean) as string[],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));
routes(app);

export default app;
