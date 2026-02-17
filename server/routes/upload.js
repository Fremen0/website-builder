const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.status(400).json({ msg: err });
        } else {
            if(req.file == undefined){
                res.status(400).json({ msg: 'No file selected!' });
            } else {
                const protocol = req.protocol;
                const host = req.get('host');
                res.json({ filePath: `${protocol}://${host}/uploads/${req.file.filename}` });
            }
        }
    });
});

module.exports = router;