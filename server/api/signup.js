import express from 'express';
import { createAccount } from '../db.js';

const router = express.Router();

// Router for creating an account
router.post('/signup', async (req, res) => {
    
    const { username, password } = req.body;

    try {
        await createAccount(username, password);
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error creating account');
    }
    res.send('Account created');
})

export default router;