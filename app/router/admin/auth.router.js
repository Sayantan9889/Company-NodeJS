const express = require('express');
const upload = require('../../helper/upload-image.helper');
const userController = require('../../controllers/admin/auth/user.controller');
const emailVerifier = require('../../middleware/email-verifier.middleware');

const router = express.Router();

/* +=========== Login ===========+ */
router.get('/login', userController.login);

// router.post('/user/login', userController.);


/* +=========== Registration ===========+ */
router.get('/registration', userController.registration);

router.post('/user/registration', upload.single('image'), userController.registerUser);
router.get('/confirmation/:email/:token', userController.confirmEmail);


module.exports = router;