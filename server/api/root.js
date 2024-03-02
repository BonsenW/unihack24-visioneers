import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Hello from root!');
    res.render('index')
})

export default router;