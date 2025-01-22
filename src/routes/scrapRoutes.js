import express from 'express';
import { getProducts } from '../services/scrapService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello scrap');
});

router.post('/', async (req, res) => {
    const { url, selector, nameSelector } = req.body;

    if (url && selector && nameSelector) {
        try {
            const products = await getProducts(url, selector, nameSelector);
            res.status(200).json({ products });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).send('Bad Request: Missing parameters');
    }
});



export default router;