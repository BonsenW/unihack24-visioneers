import express from 'express';
import { createAccount } from '../db.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, password } = req.body;
        console.log(name, password);
    } catch (e) {
        console.log(e);
    }

    try {
        await createAccount(name, password);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error creating account');
    }
    res.send('Account created');
})

export default router;