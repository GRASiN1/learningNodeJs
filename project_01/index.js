const express = require('express')
const app = express()
const port = 3000

const users = require('./MOCK_DATA.json');

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
    res.json(users);
});

app.get('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
})

app.post('/api/user', (req, res) => {
    res.json({ status: "pending" });
})

app.patch('/api/user/:id', (req, res) => {
    res.json({ status: "pending" });
})
app.delete('/api/user/:id', (req, res) => {
    res.json({ status: "pending" });
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