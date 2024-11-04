const express = require('express');
const upload = require('../../helper/upload-image.helper');
const bannerController = require('../../controllers/api/home_content/banner.controller');
const serviceController = require('../../controllers/api/home_content/service.controller');

const router = express.Router();

/* +=========== Banner ===========+ */
router.get('/home/banner/fetch-all', bannerController.fetchAllbanner);


/* +=========== Provided Services ===========+ */
router.post('/home/service/create', upload.single('image'), serviceController.createService);
router.post('/home/service/edit/:id', upload.single('image'), serviceController.editService);
router.get('/home/service/fetch-all', serviceController.fetchAllService);
router.get('/home/service/fetch-single/:id', serviceController.fetchSingleService);
router.get('/home/service/active-deactive/:id', serviceController.activeDeactiveService);
router.delete('/home/service/delete/:id', serviceController.deleteService);


module.exports = router;