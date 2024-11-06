const express = require('express');
const upload = require('../../helper/upload-image.helper');
const ourTeamController = require('../../controllers/api/about-us/our-team.controller');

const router = express.Router();


/* +=========== Our Team ===========+ */
router.get('/about-us/our-team', ourTeamController.ourTeamList);
// router.get('/about-us/our-team/create', ourTeamController.ourTeamCreate);
// router.get('/about-us/our-team/edit/:id', ourTeamController.ourTeamEdit);

/* +=========== Team Member ===========+ */
// router.post('/about-us/our-team/members/create', upload.single('image'), ourTeamController.teamMemberCreate);
// router.post('/about-us/our-team/members/edit/:id', upload.single('image'), ourTeamController.teamMemberEdit);
// router.get('/about-us/our-team/members/active-deactive/:id', ourTeamController.teamMemberActiveInactive);
// router.delete('/about-us/our-team/members/delete/:id', ourTeamController.deleteTeamMember);

module.exports = router;