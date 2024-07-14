const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');

mongoose.connect('mongodb://localhost:27017/blogify').then(() => {
    console.log('MongoDB Connected');
});

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve("./public")));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => {
    console.log(`Server listening at : http://localhost:${port}`);
})