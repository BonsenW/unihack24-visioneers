import express from 'express';
import knex from 'knex';
import { sessions } from './login.js';

// Create Express router
const router = express.Router();

// Initialize knex database connection
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'mydatabase.db'
    },
    useNullAsDefault: true
});

// Middleware to check user authentication
const authenticateUser = (req, res, next) => {
    // Check if sessionId cookie is present
    const sessionId = req.cookies.sessionId;

    // If sessionId is not present or not found in sessions, return unauthorized error
    if (!sessionId || !sessions[sessionId]) {
        return res.status(401).send('Unauthorized');
    }
    // User is authenticated, proceed to the next middleware
    next();
};

// Route for fetching health records of an authenticated user
router.get('/health', authenticateUser, async (req, res) => {
    // Extract sessionId from cookies
    const sessionId = req.cookies.sessionId;

    // Retrieve username associated with the sessionId from sessions
    const username = sessions[sessionId];

    // Query database for health records of the user
    const healthRecords = await db('healthRecord').where('username', username);

    // Send JSON response containing health records
    res.json(healthRecords);
});

// Route for creating health records
router.post('/health', async (req, res) => {
    // Extract data from request body
    const { username, age, longTermConditions, weight, height, bloodType, allergies, other } = req.body;

    // Insert health record into the database
    await db('healthRecord').insert({
        username,
        age,
        longTermConditions,
        weight,
        height,
        bloodType,
        allergies,
        other
    });

    // Send success response
    res.send('Health record created successfully');
});

// Export the router for use in other modules
export default router;