import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Routes for the API ============================
import root from './api/root.js'
import boilerplate from './api/boilerplate.js';
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

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})