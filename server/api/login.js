import express from 'express';
import knex from 'knex';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Initialize knex instance for database operations
const db = knex({
    client: 'sqlite3',
    connection: {
      filename: "mydatabase.db"
    },
    useNullAsDefault: true
});

// Object to store session IDs mapped to usernames
const sessions = {};

// Route for handling user authentication
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch user record from the database based on the provided username
        const user = await db('users').select('password').where('username', username).first();

        // if a user with the given username doesn;t exists, return a 400 Bad Request status with an error message
        if (!user) {
            return res.status(400).send({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Passwords match, generate a new session ID and store it with the username
            const sessionId = uuidv4();
            sessions[sessionId] = username;
            // Set the session ID as a cookie in the response
            res.cookie('sessionId', sessionId, { httpOnly: true });
            // Return true to indicate successful login
            res.send(true);
        } else {
            // Passwords don't match, return a 400 Bad Request status with an error message
            res.status(400).send({ error: 'Invalid username or password' });
        }
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Error during login:', error);
        // Return a 500 Internal Server Error status with a generic error message
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Export the router and sessions object for use in other modules
export { router as loginRouter, sessions };
