import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Routes for the API ============================
import root from './api/root.js'
import boilerplate from './api/boilerplate.js';

app.use('/', root)
app.use('/api/boilerplate', boilerplate);

// ===============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})