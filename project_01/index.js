const express = require('express')
const app = express()
const port = 3000
// const fs = require('fs');
// const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const connection = require('./connection');
const logReq = require('./middlewares');

// let users = require('./MOCK_DATA.json');

//connection
// mongoose
//     .connect("mongodb://localhost:27017/project_01")
//     .then(() => {
//         console.log("MongoDB connected");
//     })
//     .catch((err) => {
//         console.log("Error : ", err);
//     })
connection("mongodb://localhost:27017/project_01");

//schema
// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     gender: {
//         type: String,
//     }
// })

//Objects
// const User = mongoose.model("user", userSchema);


//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReq('log.txt'));

// app.use((req, res, next) => {
//     console.log("Hello from middleware 1");
//     next();
// })

// app.use((req, res, next) => {
//     console.log("Hello from middleware 2");
//     // res.end("Hey");
//     next();
// })

// app.use((req, res, next) => {
//     const log = `\nNew Req at : ${Date.now()} | ${req.method} | ${req.path}`;
//     fs.appendFile('./log.txt', log, (err, data) => {
//         if (err) return res.send(err);
//     })
//     next();
// })

// //Routes
app.use("/api/users", userRouter);
// // if someone try this route on browser we should return html doc
// // app.get('/users', (req, res) => {
// //     const html = `
// //     <ul>
// //         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
// //     </ul>
// //     `
// //     res.send(html);
// // })

// app.get('/api/users', async (req, res) => {
//     // res.setHeader("MyName", "GRASiN");
//     // it is a good practice to append 'X-' in the name of custom headers;
//     // res.setHeader("X-MyName", "GRASiN");
//     // res.json(users);
//     const users = await User.find({});
//     res.status(200).json(users);
// });

// app.get('/api/user/:id', async (req, res) => {
//     // const id = Number(req.params.id);
//     // const user = users.find(user => user.id === id);
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(400).json({ status: "User not found" });
//     return res.status(200), json(user);
// })

// app.post('/api/user', async (req, res) => {
//     const body = req.body;
//     if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
//         return res.status(400).json({ status: "All fields are required" });
//     }
//     // users.push({ id: users.length + 1, ...body });
//     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//     //     if (err) res.json({ error: `${err}` });
//     //     //Status code changed to 201 to tell user created
//     //     else res.status(201).json({ status: "User created" });
//     // })
//     const newUser = await User.create({
//         firstName: body.first_name,
//         lastName: body.last_name,
//         email: body.email,
//         gender: body.gender
//     })
//     return res.status(201).json({ status: "User created" });
// })

// app.patch('/api/user/:id', async (req, res) => {
//     // const id = Number(req.params.id);
//     // const body = req.body;
//     // let userIndex = users.findIndex(user => user.id === id);

//     // if (userIndex === -1) {
//     //     return res.json({ status: "User not found" });
//     // }
//     // users[userIndex] = { ...users[userIndex], ...body };
//     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//     //     if (err) {
//     //         return res.json({ error: `${err}` });
//     //     } else {
//     //         return res.json({ status: "User updated" });
//     //     }
//     // });

//     const user = await User.findByIdAndUpdate({ _id: req.params.id }, { lastName: "changed" });
//     return res.status(202).json({ status: "User updated" });
// })
// app.delete('/api/user/:id', async (req, res) => {
//     // const id = Number(req.params.id);
//     // const userIndex = users.findIndex(user => user.id === id);

//     // if (userIndex === -1) {
//     //     return res.json({ status: "User not found" });
//     // }
//     // users.splice(userIndex, 1);
//     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//     //     if (err) {
//     //         return res.json({ status: "Error occurred" });
//     //     } else {
//     //         return res.json({ status: "User deleted" });
//     //     }
//     // });
//     await User.findByIdAndDelete(req.params.id);
//     return res.status(200).json({ status: "User deleted" });
// })

// you can also write multiple fucntionalities on a single route like this
// app.route('/api/user/:id')
// .get('/api/user/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })
// .patch('/api/user/:id', (req, res) => {
//     res.json({ status: "pending" });
// })
// .delete('/api/user/:id', (req, res) => {
//     res.json({ status: "pending" });
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});