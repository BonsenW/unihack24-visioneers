import express from 'express';
import knex from 'knex';

const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'mydatabase.db'
    },
    useNullAsDefault: true
});

router.post('/health', async (req, res) => {

    const { username, age, longTermConditions, weight, height, bloodType, allergies, other } = req.body;

    await db('healthRecord').insert({
        username,
        age,
        longTermConditions,
        weight,
        height,
        bloodType,
        allergies,
        other
    });

    res.send('Health record created successfully');

})

export default router;