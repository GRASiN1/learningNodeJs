const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render('home');
})
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Server listening at : http://localhost:${port}`);
})