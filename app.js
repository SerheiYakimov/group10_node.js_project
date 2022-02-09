import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import {HttpCode} from './lib/constants'

dotenv.config();

import usersRouter from './routes/api/users';
import authRouter from './routes/api/auth';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    })
})

app.use((err, _req, res, _next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status = statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error';
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({
      status: status,
      code: statusCode,
      message: err.message,
    })
})

export default app;
