const express = require('express')
const fs = require('fs');
const zlib = require('zlib');
const app = express()
const port = 3000

fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip')))

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', (chunk) => {
        res.write(chunk);
    });
    stream.on('end', () => {
        res.end();
    });
})
app.listen(port, () => {
    console.log(`Server Running at : http://localhost:${port}`);
})