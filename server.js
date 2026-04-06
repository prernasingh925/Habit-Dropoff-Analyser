import express from 'express';
import cors from 'cors';
import handler from './api/gemini.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  await handler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API server listening on port ${PORT}`);
});
