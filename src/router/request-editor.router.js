const express = require('express');
const app = express();
const db = require('../config/db');


const authenticate = require('../middleware/authenticate.middleware');

// API user request to become editor
app.post('/request-editor', authenticate, async (req, res) => {
    try {
        const userId = req.user.id; // Lấy user_id từ middleware authenticate

        // Check request exist
        const [rows] = await db.query('SELECT * FROM user_requests WHERE user_id = ? AND request_status = ?', [userId, 'Pending']);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'You already have a pending request.' });
        }

        // Add request into db
        await db.query('INSERT INTO user_requests (user_id, request_status) VALUES (?,?)', [userId, 'Pending']);
        res.status(201).json({ message: 'Request submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
