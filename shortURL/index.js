//imports
const express = require('express');
const urlRouter = require('./routes/url');
const connection = require('./connection');
const staticRouter = require('./routes/staticRoutes');
const path = require('path');

//variables
const app = express();
const port = 3000;

//function calls
connection('mongodb://localhost:27017/shortURL');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middlewares
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/url', urlRouter);
app.use('/', staticRouter);


app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}`);
});