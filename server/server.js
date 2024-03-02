import express from 'express';
import http from 'http';
import { createTable } from './db.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
// Routes for the API ============================
import root from './api/root.js'
import boilerplate from './api/boilerplate.js';
<<<<<<< HEAD
import signupRouter from './api/signup.js';

app.use('/', root)
app.use('/api/boilerplate', boilerplate);
app.use('/api/authentication', signupRouter);

await createTable();
=======
import loginRouter from './api/login.js';

app.use(express.json())

app.use('/', root)
app.use('/api/boilerplate', boilerplate);
app.use('/api/authentication', loginRouter)

// Database connection ===========
import knex from 'knex';

const db = knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

async function createTable(){
    const doesTableExist = await db.schema.hasTable('users')

    if (!doesTableExist) {

        await db.schema.createTable('users', function (table) {
            table.increments();
            table.string('username');
            table.string('password');
        })
    } else {
        console.log("Table exists")
    }
}

await createTable()
>>>>>>> acdb42a4eaee56e33a800700ca75abba50261f54

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})