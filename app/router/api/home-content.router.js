const express = require('express');
const upload = require('../../helper/upload-image.helper');
const bannerController = require('../../controllers/api/home_content/banner.controller');
const aboutUsController = require('../../controllers/api/home_content/about-us.controller');
const serviceController = require('../../controllers/api/home_content/service.controller');

const router = express.Router();

/* +=========== Banner ===========+ */
router.post('/home/banner/create', upload.single('image'), bannerController.createBanner);
router.post('/home/banner/edit/:id', upload.single('image'), bannerController.editBanner);
router.get('/home/banner/fetch-all', bannerController.fetchAllbanner);
router.get('/home/banner/fetch-single/:id', bannerController.fetchSingleBanner);
router.get('/home/banner/active-deactive/:id', bannerController.activeDeactiveBanner);
router.delete('/home/banner/delete/:id', bannerController.deleteBanner);


/* +=========== About us ===========+ */
router.post('/home/about-us/create', aboutUsController.createAboutUs);
router.get('/home/about-us/fetch', aboutUsController.fetchAboutUsHome);


/* +=========== Provided Services ===========+ */
router.post('/home/service/create', upload.single('image'), serviceController.createService);
router.post('/home/service/edit/:id', upload.single('image'), serviceController.editService);
router.get('/home/service/fetch-all', serviceController.fetchAllService);
router.get('/home/service/fetch-single/:id', serviceController.fetchSingleService);
router.get('/home/service/active-deactive/:id', serviceController.activeDeactiveService);
router.delete('/home/service/delete/:id', serviceController.deleteService);


module.exports = router;