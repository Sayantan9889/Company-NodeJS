const express = require('express');
const upload = require('../../helper/upload-image.helper');
const bannerController = require('../../controllers/api/home_content/banner.controller');
const serviceController = require('../../controllers/api/home_content/service.controller');

const router = express.Router();

/* +=========== Banner ===========+ */
router.get('/home/banner/fetch-all', bannerController.fetchAllbanner);


/* +=========== Provided Services ===========+ */
router.get('/home/service/fetch-all', serviceController.fetchAllService);
router.get('/home/service/fetch-single/:id', serviceController.fetchSingleService);


module.exports = router;