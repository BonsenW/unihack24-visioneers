import express from 'express';
import h from 'http';

const app = express();
const http = h.createServer(app);

// Routes for the API ============================
import boilerplate from './api/boilerplate.js';
app.use('/api/boilerplate', boilerplate);

// ===============================================

// root 
app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Available on http://localhost:' + PORT);
})