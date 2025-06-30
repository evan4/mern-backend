import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import 'dotenv/config';

import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const app = express();
const PORT = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

connectDB();

//middleware
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRoutes);

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", 'http://localhost:4000')
    }
  }),
)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
