const express = require('express');
const aboutUsController = require('../../controllers/admin/about-us/about.controller');

const router = express.Router();


/* +=========== About us ===========+ */
router.get('/about-us/about', aboutUsController.aboutUsList);
router.get('/about-us/about/update/:id', aboutUsController.aboutUsUpdate);

router.post('/about-us/about/edit/:id', aboutUsController.editAboutUs);


module.exports = router;