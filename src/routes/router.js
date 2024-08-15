const express = require('express');
const admin = require('../controllers/admin.controller');
const user = require ('../controllers/user.controller')
const router = express.Router();

const authenticate = require('../middleware/authenticate.middleware');
const authorize = require('../middleware/authorize.middleware');

router.get('/list-requests', authenticate, authorize('admin'),admin.list_request);
router.put('/editor-requests/:id/approve', authenticate, authorize('admin'),admin.accept_request);
router.put('/editor-requests/:id/deny', authenticate, authorize('admin'), admin.denied_request);
router.post('/request-editor', authenticate(), user.request_editor);
