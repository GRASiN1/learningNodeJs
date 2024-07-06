const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

let users = require('./MOCK_DATA.json');

//middleware
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log("Hello from middleware 1");
//     next();
// })

// app.use((req, res, next) => {
//     console.log("Hello from middleware 2");
//     // res.end("Hey");
//     next();
// })

app.use((req, res, next) => {
    const log = `\nNew Req at : ${Date.now()} | ${req.method} | ${req.path}`;
    fs.appendFile('./log.txt', log, (err, data) => {
        if (err) return res.send(err);
    })
    next();
})

//Routes
// if someone try this route on browser we should return html doc
// app.get('/users', (req, res) => {
//     const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `
//     res.send(html);
// })

app.get('/api/users', (req, res) => {
    // res.setHeader("MyName", "GRASiN");
    // it is a good practice to append 'X-' in the name of custom headers;
    res.setHeader("X-MyName", "GRASiN");
    res.json(users);
});

app.get('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) return res.json({ status: "User not found" });
    return res.json(user);
})

app.post('/api/user', (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) res.json({ error: `${err}` });
        else res.json({ status: "User created" });
    })
})

app.patch('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    let userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.json({ status: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.json({ error: `${err}` });
        } else {
            return res.json({ status: "User updated" });
        }
    });
})
app.delete('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.json({ status: "User not found" });
    }
    users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.json({ status: "Error occurred" });
        } else {
            return res.json({ status: "User deleted" });
        }
    });

})

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