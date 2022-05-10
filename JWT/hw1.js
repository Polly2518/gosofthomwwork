require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const users = []
const testuseracc = [{
    username: 'cap',
    title: 'access1'

}, {
    username: 'cap2',
    title: 'access2'
}]
app.get('/user/getinfo', (req, res) => {

    res.status(200).send(users)

})
app.post('/user/create', async(req, res) => {

    try {

        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, password: hashpassword }
        users.push(user)
        res.status(201).send('user created.')

    } catch (error) {
        res.status(500).send('Not Success ' + error)
    }

})

app.post('/user/login', async(req, res) => {
    const user = users.find(user => users.username = req.body.username)
    if (user == null) {

        return res.status(400).send('User can not be found.')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const username = req.body.username
            const userath = { username: username }
            const accesstoken = jwt.sign(userath, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accesstoken: accesstoken })

        } else {
            res.status(400).send('Password worng or Empty')
        }


    } catch (error) {
        res.status(500).send('NOT OK' + error)
    }


})

app.post('/user/getacc', authToken, (req, res) => {
    res.json(testuseracc.filter(testuseracc => testuseracc.username == req.userath.username))


})

function authToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send("NO TOKEN FOUND")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userath) => {
        if (err) return res.status(403).send("you don't have permission to enter")
        req.userath = userath
        next()
    })

}

app.listen(3000, () => {
    console.log('Listening on port: 3000');
})