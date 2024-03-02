import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.send('Hello signup!');
})

export default router;