const express = require('express');
const upload = require('../../helper/upload-image.helper');
const bannerController = require('../../controllers/admin/home_content/banner.controller');
const serviceController = require('../../controllers/admin/home_content/service.controller');
const testimonialController = require('../../controllers/admin/home_content/testimonial.controller');

const router = express.Router();

/* +=========== banner ===========+ */
router.get('/home/banner', bannerController.bannerList);
router.get('/home/banner/add', bannerController.bannerAdd);
router.get('/home/banner/update/:id', bannerController.bannerUpdate);

router.post('/home/banner/create', upload.single('image'), bannerController.createBanner);
router.post('/home/banner/edit/:id', upload.single('image'), bannerController.editBanner);
router.get('/home/banner/active-deactive/:id', bannerController.activeDeactiveBanner);
router.delete('/home/banner/delete/:id', bannerController.deleteBanner);




/* +=========== Services ===========+ */
router.get('/home/service', serviceController.serviceList);
router.get('/home/service/add', serviceController.serviceAdd);
router.get('/home/service/update/:id', serviceController.serviceUpdate);

router.post('/home/service/create', upload.single('image'), serviceController.createService);
router.post('/home/service/edit/:id', upload.single('image'), serviceController.editService);
router.get('/home/service/active-deactive/:id', serviceController.activeDeactiveService);
router.delete('/home/service/delete/:id', serviceController.deleteService);





/* +=========== Testimonial ===========+ */
router.get('/home/testimonials', testimonialController.testimonyListPage);
router.get('/home/testimony/add', testimonialController.addTestimonyPage);
router.get('/home/testimony/update/:id', testimonialController.editTestimonyPage);

router.post('/home/testimony/create', upload.single('image'), testimonialController.addTestimony);
router.post('/home/testimony/edit/:id', upload.single('image'), testimonialController.editTestimony);
router.get('/home/testimony/active-deactive/:id', testimonialController.activeDeactivateTestimony);
router.delete('/home/testimony/delete/:id', testimonialController.deleteTestimony);



module.exports = router;