const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    namedPlaceholders: true,
    host: "localhost",
    user: "root",
    password: "",
    database: "gosofthomework"
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("my sql connected")

})


app.post('/user/create', (req, res) => {

    if (!req.body.username ||
        !req.body.password) {
        return res.status(400).send("error invalid data");
    }
    const hashedPassword = SHA256(req.body.password).toString()


    let sql = 'INSERT INTO user_login VALUE (:username,:password)'
    let query = db.query(sql, {
        username: req.body.username,
        password: hashedPassword
    }, (err, results) => {
        if (err) {

            return res.send('something wrong' + err);
        }

        res.send('Data inserted')

    })

})
app.post('/employee/login', (req, res) => {


    if (!req.body.username || !req.body.password) {

        return res.status(400).send('User can not be found.')
    }
    try {
        const hashedPassword = SHA256(req.body.password).toString()
        console.log(hashedPassword)
        let sql = 'SELECT password FROM user_login WHERE password=:password AND username =:username'
        db.query(sql, {
            password: hashedPassword,
            username: req.body.username
        }, (err, results) => {
            if (err) {

                return res.send('something wrong' + err);
            }
            if (results.length > 0) {
                const username = req.body.username
                const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accesstoken: accessToken })

            } else {
                console.log(results)
                res.status(400).send('Password wrong or Empty')
            }


        });
    } catch (error) {
        res.status(500).send('NOT OK' + error)
    }


})




app.get('/employee/getdata', authToken, (req, response) => {
    let sql = 'SELECT * FROM employee_info'
    let query = db.query(sql, (err, res) => {
        if (err) throw err
        response.send(res)
    })
})

app.post('/employee/createData', authToken, (req, response) => {

    if (!req.body.firstname ||
        !req.body.lastname ||
        !req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email) {
        return response.status(400).send("error invalid data");
    }

    console.log(req.body);

    let sql = 'INSERT INTO employee_info VALUE (:fname ,:lname ,:id ,:pos ,:tel ,:email )'
    db.query(sql, {
        fname: req.body.firstname,
        lname: req.body.lastname,
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email

    }, (err, results) => {
        if (err) {

            return response.send('something wrong' + err);
        }

        response.send('Data inserted')

    });
})

app.put('/employee/updateData', authToken, (req, response) => {
    if (!req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
    ) {
        return response.status(400).send("error invalid data");
    }

    let sql = 'UPDATE employee_info SET pos =:pos ,tel =:tel ,email =:email WHERE id =:id'
    db.query(sql, {
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email

    }, (err, results) => {
        if (err) {

            return response.send('something wrong' + err);
        }

        response.send('Data update')

    });
})

app.delete('/employee/deleteData', authToken, (req, response) => {
    if (!req.body.id) return response.status(400).send("error invalid data");

    let sql = 'DELETE FROM employee_info WHERE id=:id'
    db.query(sql, {
        id: req.body.id,


    }, (err, results) => {
        if (err) {

            return response.send('something wrong' + err);
        }

        response.send('Data delete')

    });
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
    console.log(`Listening on port: 3000`);
});

/*ให้ทำการสร้าง File hw1.js 
ให้ทำการสร้างการเก็บข้อมูล พนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE) 
โดยในกรณีของการ Update และ Delete ถ้าหากว่าส่งข้อมูล id เข้ามาผิดจะต้องทำการ Return เป็น HTTP Response 400 และบอกว่าข้อมูลไม่ถูกต้อง 
โดย ข้อมูลของพนักงานกำหนดให้รับข้อมูลดังนี้ (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email) 
ถ้ามีข้อมูล email และ เบอร์โทรศัพท์อยู่ในระบบอยู่แล้วจะต้องไม่สามารถสร้างข้อมูล ใหม่มาทับซ้อนได้และ ห้ามแก้ไขข้อมูล ชื่อ นามสกุล ถ้าหากเข้าเงื่อนไขเหล่านี้ให้ Return เป็น HTTP Response 400 
โดยให้ทำการบันทึกเข้าฐานข้อมูล Oracle Database และ ใช้ Ngrok ใน การทดสอบ API 
และ ในการยิง API ให้มีการตรวจสอบด้วยวิธีการแบบ OAuth2!*/