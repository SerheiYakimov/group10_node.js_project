import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

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


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
