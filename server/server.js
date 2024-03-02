import express from 'express';
import http from 'http';
import expressLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`);

app.use(expressLayouts)
app.use(express.static('public'))

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