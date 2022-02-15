import app from '../app';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log('Database connect'), app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
