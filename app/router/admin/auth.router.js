const express = require('express');
const upload = require('../../helper/upload-image.helper');
const ourTeamController = require('../../controllers/admin/about-us/our-team.controller');

const router = express.Router();

/* +=========== Login ===========+ */
router.get('/login', ourTeamController.teamMemberAdd);

router.post('/user/login', ourTeamController.teamMemberCreate);


/* +=========== Registration ===========+ */
router.get('/registration', ourTeamController.teamMemberAdd);

router.post('/user/registration', upload.single('image'), ourTeamController.teamMemberCreate);


module.exports = router;