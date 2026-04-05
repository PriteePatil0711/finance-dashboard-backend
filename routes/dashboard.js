const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

router.get('/summary', auth, dashboardController.getSummary);
router.get('/categories', auth, authorizeRoles('admin', 'analyst'), dashboardController.getCategories);
router.get('/trends', auth, authorizeRoles('admin', 'analyst'), dashboardController.getTrends);
router.get('/recent', auth, dashboardController.getRecent);
router.get('/insights', auth, authorizeRoles('admin', 'analyst'), dashboardController.getInsights);

module.exports = router;