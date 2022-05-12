require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const SHA256 = require("crypto-js/sha256");
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
const users = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
});


app.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        return res.status(401).send("PLEASE INPUT DATA")
    }
    if (req.body.username == users.username && req.body.password == users.password) {
        const token = jwt.sign({ username: req.body.username }, process.env.ACCESS_TOKEN_SECRET)
        res.cookie('token', token)
        res.redirect('/home')
    } else {
        res.cookie('token', "")
        res.redirect('/')
    }
})


app.get('/register', (req, res) => {

    res.sendFile(__dirname + '/regis.html')


})
app.post('/user/register', (req, res) => {
    console.log(req.body.username)
    if (!req.body.username || !req.body.password) {
        return res.status(401).send("PLEASE INPUT DATA")
    }
    try {

        const hashpassword = SHA256(req.body.password).toString()
        const user = { username: req.body.username, password: hashpassword }
        users.push(req.body.username)
        console.log('user registered')
        console.log(users)
        res.sendFile(__dirname + '/login.html')
    } catch (error) {
        res.status(500).send('Not Success ' + error)
    }

})


app.get('/home', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(401).send("PLEASE INPUT DATA")
    }
    if (!req.cookies.token) return res.sendFile(__dirname + '/login.html')

    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) {
            return res.sendFile(__dirname + '/login.html')
        }
        res.sendFile(__dirname + "/home.html")
    })
});




app.listen(3000, () => {
    console.log('Listening on port: 3000');
})