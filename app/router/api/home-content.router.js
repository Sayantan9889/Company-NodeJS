const express = require('express');
const upload = require('../../helper/upload-image.helper');
const bannerController = require('../../controllers/api/home_content/banner.controller');
const aboutUsController = require('../../controllers/api/home_content/about-us.controller');

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


module.exports = router;