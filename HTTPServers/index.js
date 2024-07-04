/* 
http module is used to create servers
createServer fnc takes a callBack fnc that have two parameters as obj
req - contain every information abt the request made on server
res - contain every information abt response send by server;
we use listen fnc to monitor any request coming on to server
it take two paramets
port number - the port we want to listen to;
callBack fnc (optional);
 */
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log("New req received");
    // console.log(req.headers);
    const log = `${Date.now()}: ${req.url} : New request received\n`;
    fs.appendFile('./log.txt', log, (err, data) => {
        switch (req.url) {
            case "/": res.end("Homepage");
                break;
            case "/about": res.end("I am GRASiN");
                break;
            default: res.end("404 Not found");
        }
    });
});

server.listen(8000, () => {
    console.log("Server started");
});