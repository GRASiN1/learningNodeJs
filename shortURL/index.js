//imports
const express = require('express');
const connection = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser');

// const { restrictToLoggedInUserOnly, checkAuth } = require('./middleware/auth');
const { checkForAuthentication, restrictTo } = require('./middleware/auth');
const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticRoutes');

//variables
const app = express();
const port = 3000;

//function calls
connection('mongodb://localhost:27017/shortURL');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

//routes
app.use('/url', restrictTo(['NORMAL']), urlRouter);
app.use('/user', userRouter);
app.use('/', staticRouter);

app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}`);
});