const express = require('express');
const bannerController = require('../../controllers/admin/home_content/banner.controller');
const upload = require('../../helper/upload-image.helper');
const aboutUsController = require('../../controllers/admin/home_content/about-us.controller');
const serviceController = require('../../controllers/admin/home_content/service.controller');

const router = express.Router();

/* +=========== banner ===========+ */
router.get('/home/banner', bannerController.bannerList);
router.get('/home/banner/add', bannerController.bannerAdd);
router.get('/home/banner/update/:id', bannerController.bannerUpdate);

router.post('/home/banner/create', upload.single('image'), bannerController.createBanner);
router.post('/home/banner/edit/:id', upload.single('image'), bannerController.editBanner);
router.get('/home/banner/active-deactive/:id', bannerController.activeDeactiveBanner);
router.delete('/home/banner/delete/:id', bannerController.deleteBanner);


/* +=========== About us ===========+ */
router.get('/home/about-us', aboutUsController.aboutUsList);
router.get('/home/about-us/update/:id', aboutUsController.aboutUsUpdate);

router.post('/home/about-us/edit/:id', aboutUsController.editAboutUs);


/* +=========== Services ===========+ */
router.get('/home/services', serviceController.serviceList);
router.get('/home/services/add', serviceController.serviceAdd);

router.post('/home/service/create', upload.single('image'), serviceController.createService)


/* +=========== banner ===========+ */



module.exports = router;