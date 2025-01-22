import express from 'express';
import cors from 'cors';

import scrapRoutes from './routes/scrapRoutes.js';

const app = express();


app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/scrap', scrapRoutes);

app.use('/hola', (req, res) => {
    res.send('Hola');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});