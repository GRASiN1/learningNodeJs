const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comments');

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

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');
    return res.render('blog', {
        user: req.user,
        blog: blog,
        comments: comments,
    })
})

router.post('/comments/:id', async (req, res) => {
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogId: req.params.id,
    })
    return res.redirect(`/blog/${req.params.id}`);
})

module.exports = router;