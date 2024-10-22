const express = require('express');
const dashboardController = require('../../controllers/admin/dashboard/dashboard.controller');
const authenticator = require('../../middleware/authenticator.middleware');

const router = express.Router();

router.get('/',  dashboardController.dashboardView); // authenticator.isLoggedin,

module.exports = router;