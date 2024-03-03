// add email (change username to name) as auth
// add contact number to record, add name to record
// use object {email, user} in sessions

import express from 'express';
import http from 'http';
import { createHealthTable, createUserTable } from './db.js';
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());

// Routes for the API ============================
import root from './api/root.js'
import signupRouter from './api/signup.js';
import {loginRouter} from './api/login.js';
import healthRouter from './api/health.js';

app.use('/', root);
app.use('/api/authentication', signupRouter);
app.use('/api/authentication', loginRouter);
app.use('/api/', healthRouter);

await createUserTable();
await createHealthTable();

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})