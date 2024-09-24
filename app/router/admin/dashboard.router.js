const express = require('express');
const dashboardController = require('../../controllers/admin/dashboard/dashboard.controller');

const router = express.Router();

router.get('/', dashboardController.dashboardView);

module.exports = router;