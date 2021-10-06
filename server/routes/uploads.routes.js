const express = require("express");
const router = express.Router();

const uploader = require('../config/upload.config')

router.post('/image', uploader.single("photos"), (req, res) => {

    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading the file' })
        return
    }
    console.log(req.body)
    res.json({ cloudinary_url: req.file.path })

})
router.post('/profile', uploader.single("photo_profile"), (req, res) => {

    if (!req.file) {
        res.status(500).json({ code: 500, message: 'Error loading the file' })
        return
    }
    console.log(req.body)
    res.json({ cloudinary_url: req.file.path })


})


module.exports = router