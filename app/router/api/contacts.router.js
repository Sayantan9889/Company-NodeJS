const express = require('express');
const contactInfoController = require('../../controllers/api/contacts/contact-info.controller');

const router = express.Router();

/* +=========== Contact Info ===========+ */
router.get('/contact-info/fetch', contactInfoController.fetchContactInfo);


/* +=========== Contact Request ===========+ */


module.exports = router;