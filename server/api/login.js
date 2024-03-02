import express from 'express';
import knex from 'knex';
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

const sessions = {};

router.post('/login', async(req, res) => {

    const {username, password} = req.body;

    let hashPass = await db('users').select('password').where('username', username).first();
    hashPass = hashPass.password

    console.log(hashPass)
    
    const match = await bcrypt.compare(password, hashPass)

    if (match){
        const sessionId = uuidv4();
        sessions[sessionId] = username;
        res.cookie('sessionId', sessionId, { httpOnly: true });
        res.send(true)
    } else{
        res.send(false)
    }

})

export default router;