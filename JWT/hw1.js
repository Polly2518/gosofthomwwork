require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const SHA256 = require("crypto-js/sha256");
const app = express();
app.use(express.json());
app.use(cookieParser())

const users = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
});

app.get('/home', (req, res) => {
    if (!req.cookies.token) return res.redirect('/error')

    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) {
            return res.redirect('/error')
        }
        res.sendFile(__dirname + "/home.html")
    })
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

app.post('/login', (req, res) => {
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
    try {

        const hashpassword = SHA256(req.body.password)
        const user = { username: req.body.username, password: hashpassword }
        users.push(user)
        console.log('user registered')
        res.sendFile(__dirname + '/login.html')
    } catch (error) {
        res.status(500).send('Not Success ' + error)
    }

})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
})







/*app.get('/user/getinfo', (req, res) => {

    res.status(200).send(users)

})

app.get('/home', authToken, (req, res) => {

    res.sendFile(__dirname + '/home.html')


})

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/login.html')


})

app.get('/register', (req, res) => {

    res.sendFile(__dirname + '/regis.html')


})
app.post('/user/register', (req, res) => {
    try {

        const hashpassword = SHA256(req.body.password)
        const user = { username: req.body.username, password: hashpassword }
        users.push(user)
        console.log('user registered')
        res.sendFile(__dirname + '/login.html')
    } catch (error) {
        res.status(500).send('Not Success ' + error)
    }

})

app.post('/user/login', authToken, async(req, res) => {
    const user = users.find(user => users.username = req.body.username)
    if (user == null) {

        return res.status(400).send('User can not be found.')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const username = req.body.username
            const userath = { username: username }
            const accesstoken = jwt.sign(userath, process.env.ACCESS_TOKEN_SECRET)

            console.log({ accesstoken: accesstoken })
            res.cookie(accesstoken.toString())
            res.redirect('/home')

        } else {
            res.status(400).send('Password worng or Empty')
        }


    } catch (error) {
        res.status(500).send('NOT OK' + error)
    }


})


function authToken(req, res, next) {


    const token = req.cookie.accesstoken
    if (token == null) return res.status(401).send("NO TOKEN FOUND")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userath) => {
        if (err) return res.status(403).send("you don't have permission to enter")
        req.userath = userath
        next()
    })

}*/