const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})
const upload = multer({ storage: storage })

const router = Router();

router.get('/addBlog', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
})

router.post('/addNew', upload.single('coverImage'), async (req, res) => {
    const blog = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        coverImage: `uploads/${req.file.filename}`,
        createdBy: req.user._id,
    })
    return res.redirect(`/blog/${blog._id}`);
})

module.exports = router;