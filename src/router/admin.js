const express = require('express');
const app = express();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate.middleware');
const authorize = require('../middleware/authorize.middleware'); // Middleware check admin role

// API get list user's request is pending
app.get('/editor-requests', authenticate, authorize('admin'), async (req, res) => {
    try {
        const [list] = await db.query('SELECT ur.id, u.username, ur.request_status, ur.resource_id FROM user_requests ur JOIN users u ON ur.user_id = u.id WHERE ur.request_status = ?', ['pending']);
        res.json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});


app.put('/editor-requests/:id/approve', authenticate, authorize('admin'), async (req, res) => {
    const requestId = req.params.id;

    try {
        // Update request status 
        await db.query('UPDATE user_requests SET request_status = ? WHERE id = ?', ['Accepted', requestId]);

        // Add editor role to this user
        const [requestRow] = await db.query('SELECT user_id FROM user_requests WHERE id = ?', [requestId]);
        const userId = requestRow[0].user_id;
        await db.query('INSERT INTO roleofuser (user_id, role) VALUES (?, ?)', [userId, 'editor']);

        res.json({ message: 'Request approved and user granted editor role.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

app.put('/editor-requests/:id/deny', authenticate, authorize('admin'), async (req, res) => {
    const requestId = req.params.id;

    try {
        // Denied editor role to this user
        await db.query('UPDATE user_requests SET request_status = ? WHERE id = ?', ['denied', requestId]);
        res.json({ message: 'Request denied.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});




module.exports = app;
