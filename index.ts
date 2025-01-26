import { config } from 'dotenv';
config();
import { createServer } from 'node:http';
import app from './app';
import { dbConnect } from './src/common/dbConnect';

const PORT = process.env.PORT || 3000;
createServer(app).listen(PORT, () => {
  dbConnect();
  console.log(`API started and listening on port ${PORT}`);
});
