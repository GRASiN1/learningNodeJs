//imports
const express = require('express');
const urlRouter = require('./routes/url');
const connection = require('./connection');

//variables
const app = express();
const port = 3000;

//function calls
connection('mongodb://localhost:27017/shortURL');

//middlewares
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/url', urlRouter);


app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}`);
});