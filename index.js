import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import userControllers from './Controller/userController.js';
import eventController from './Controller/eventController.js';
import queryController from './Controller/queryController.js';
import authenticateToken from './middleware/Auth.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//user controllers
app.post('/api/createUser', userControllers.createUser);
app.post('/api/login', userControllers.login);

app.post('/api/events', authenticateToken, eventController.addEvent);
app.get('/api/getevents', authenticateToken, eventController.getEvents);
app.put('/api/events/:id', authenticateToken, eventController.editEvent);
app.delete('/api/events/:id', authenticateToken, eventController.deleteEvent);

app.post('/api/admin/query', queryController.runQuery);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});