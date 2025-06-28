import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js';
const app = express()
const PORT = 4000

app.use(cors());

connectDB();

//middleware
app.use(express.json());

app.use('/api/auth', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
