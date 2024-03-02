import express from 'express';
import knex from 'knex';
import bcrypt from 'bcrypt'

const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

router.post('/login', async(req, res) => {

    const {username, password} = req.body;
    let hashPass = await db('users').select('password').where('username', username).first();
    hashPass = hashPass.password

    console.log(hashPass)
    
    const match = await bcrypt.compare(password, hashPass)
    if(match){
        res.send(true)
    }else{
        res.send(false)
    }

    // // Find the user from database
    // const user = await db('users').where('username', username).first();

    // // if there is no user OR if there the users password is not equal
    // if ((!user) || (password !== user.password)) {
    //     res.send("fail");
    // } else {
    //     res.send("success")
    // }

})

export default router;