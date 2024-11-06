const express = require('express');
const aboutUsController = require('../../controllers/api/about-us/about.controller');
const ourTeamController = require('../../controllers/api/about-us/our-team.controller');

const router = express.Router();

/* +=========== About us ===========+ */
router.post('/about-us/about/create', aboutUsController.createAboutUs);
router.get('/about-us/about/fetch', aboutUsController.fetchAboutUsHome);

module.exports = router;