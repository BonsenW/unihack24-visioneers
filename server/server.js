import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Routes for the API ============================
import root from './api/root.js'
import boilerplate from './api/boilerplate.js';

app.use('/', root)
app.use('/api/boilerplate', boilerplate);

// Database connection ===========
import knex from 'knex';

knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    }
});



knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
    table.string('password');
}).then(a => {
    console.log("a")
})

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})