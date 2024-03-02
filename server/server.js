import express from 'express';
import http from 'http';
import { createTable } from './db.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
// Routes for the API ============================
import root from './api/root.js'
import signupRouter from './api/signup.js';
import loginRouter from './api/login.js';

app.use('/', root)

app.use('/api/authentication', signupRouter);
app.use('/api/authentication', loginRouter)

await createTable();

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})