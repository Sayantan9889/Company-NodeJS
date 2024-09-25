const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, res, cb) => {
        const ext = path.extname(res.originalname);
        const uniqueName = `${uuidv4()}${ext}`;
        cb(null, uniqueName);
    }
})

const fileFilter = (req, res, cb) => {
    // if (!res.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log("res.mimetype: ", res.mimetype);
    if (res.mimetype === 'image/jpeg' || res.mimetype === 'image/png' || res.mimetype === 'image/jpg' || res.mimetype === 'image/gif'  || res.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        return cb(new Error('Only image files are allowed!'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB
    fileFilter: fileFilter
});

module.exports = upload;