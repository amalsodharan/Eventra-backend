import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import eventController from './Controller/eventController.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/events', eventController.addEvent);
app.get('/api/getevents', eventController.getEvents);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});