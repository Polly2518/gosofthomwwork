/*
ให้ทำการสร้าง File hw1.js 
ให้ทำการสร้างการเก็บข้อมูล พนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE) 

- CREATE / POST
input: (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email)
ห้าม email / tel ซ้ำ

- GET / GET
ดึงข้อมูล

- DELETE / DELETE
input: ID
if input error -> return 400 / บอกว่าข้อมูลไม่ถูกต้อง

- UPDATE / PUT
input: ID
input: update? set?
ห้ามแก้ไขข้อมูล ชื่อ นามสกุล 
if error -> return 400
*/

const express = require('express');

const app = express();
app.use(express.json());

let data = []

app.get('/getData', (req, response) => {
    response.send(data)
})

app.post('/createData', function(req, response) {

    if (!req.body.firstname ||
        !req.body.lastname ||
        !req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email) {
        return response.status(400).send("error invalid data");
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].employee_id == req.body.id ||
            data[i].tel == req.body.tel ||
            data[i].email == req.body.email)
            return response.status(400).send("error data ซ้ำ");
    }

    console.log(req.body);

    let emp = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        employee_id: req.body.id,
        position: req.body.pos,
        tel: req.body.tel,
        email: req.body.email
    };

    data.push(emp);

    response.send("ok");
})

app.put('/updateData', (req, response) => {
    if (!req.body.id ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
    ) {
        return response.status(400).send("error invalid data");
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].employee_id == req.body.id) {
            //update ของเดิม
            data[i].position = req.body.pos
            data[i].tel = req.body.tel
            data[i].email = req.body.email

            return response.send("ok");
        }
    }

    return response.status(400).send("error not found");
})

app.delete('/deleteData', (req, response) => {
    if (!req.body.id) return response.status(400).send("error invalid data");

    for (let i = 0; i < data.length; i++) {
        if (data[i].employee_id == req.body.id) {
            data.splice(i, 1);
            return response.send("ok");
        }
    }

    return response.status(400).send("error not found");
})

app.listen(3000, () => {
    console.log(`Listening on port: 3000`);
});