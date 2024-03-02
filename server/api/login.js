import express from 'express';
import knex from 'knex';

const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

router.get('/login', (req, res) => {
    res.send("Hi from login")
})

router.post('/login', async(req, res) => {

    const {username, password} = req.body;

    // Find the user from database
    const user = await db('users').where('username', username).first();

    // if there is no user OR if there the users password is not equal
    if ((!user) || (password !== user.password)) {
        res.send("fail");
    } else {
        res.send("success")
    }

})

export default router;