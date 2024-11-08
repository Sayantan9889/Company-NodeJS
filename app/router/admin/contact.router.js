const express = require('express');
const upload = require('../../helper/upload-image.helper');
const contactInfoController = require('../../controllers/admin/contacts/contact-info.controller');
const contactRequestController = require('../../controllers/admin/contacts/contact-request.controller');

const router = express.Router();

/* +=========== Contact Info ===========+ */
router.get('/contacts/contact-info', contactInfoController.contactInfoPage);
router.post('/contacts/contact-info/change', contactInfoController.changeContactInfo);


/* +=========== Contact Request ===========+ */
router.get('/contacts/contact-requests', contactRequestController.contactRequestListPage);
router.delete('/contacts/contact-requests/delete/:id', contactRequestController.deleteContactRequest);


module.exports = router;