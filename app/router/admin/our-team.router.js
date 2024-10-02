const express = require('express');
const upload = require('../../helper/upload-image.helper');
const oueTeamController = require('../../controllers/admin/about-us/our-team.controller');

const router = express.Router();


/* +=========== Our Team ===========+ */
router.get('/about-us/our-team', oueTeamController.ourTeamList);
router.get('/about-us/our-team/update/:id', oueTeamController.ourTeamUpdate);

// router.post('/about-us/our-team/edit/:id', upload.single('image'), oueTeamController.editBanner);

module.exports = router;