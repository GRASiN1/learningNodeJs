const fs = require('fs');

// works in synchronous manner (cpu waits till this task to end)
// fs.writeFileSync('./test.txt', 'Hey there');

// works in async manner(cpu doesnt wait for this task to end), it returns a promise;
// fs.writeFile('./test.txt', 'message', (err)=>{
//     console.log(err);
// })

// works in sync manner, need to give filename and encoding format;
// const data = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(data);
// works in async manner, need fileName, encoding format, and function
// fs.readFile('./contacts.txt', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// })

// appendFile : if you dont want to delete previous data present in a file
// it also works in both sync and async manner;
// fs.appendFileSync('./test.txt', new Date().getDate().toString());
// used to delete file
// fs.unlinkSync('./test.txt');