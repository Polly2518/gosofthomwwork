const express = require('express');

const app = express();
app.use(express.json());

let data = []

app.get('/getData', (req, response) => {
    response.send(data)
})

app.post('/createData', (req, response) => {

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
            return response.status(400).send("error data already exist");
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

/*ให้ทำการสร้าง File hw1.js 
ให้ทำการสร้างการเก็บข้อมูล พนักงานในบริษัท โดยจะต้องใช้ REST API (GET,PUT,POST,DELETE) 
โดยในกรณีของการ Update และ Delete ถ้าหากว่าส่งข้อมูล id เข้ามาผิดจะต้องทำการ Return เป็น HTTP Response 400 และบอกว่าข้อมูลไม่ถูกต้อง 
โดย ข้อมูลของพนักงานกำหนดให้รับข้อมูลดังนี้ (ชื่อ,นามสกุล,รหัสพนักงาน,ตำแหน่ง,เบอร์ติดต่อ,email) 
ถ้ามีข้อมูล email และ เบอร์โทรศัพท์อยู่ในระบบอยู่แล้วจะต้องไม่สามารถสร้างข้อมูล ใหม่มาทับซ้อนได้และ ห้ามแก้ไขข้อมูล ชื่อ นามสกุล ถ้าหากเข้าเงื่อนไขเหล่านี้ให้ Return เป็น HTTP Response 400 
โดยให้ทำการบันทึกเข้าฐานข้อมูล Oracle Database และ ใช้ Ngrok ใน การทดสอบ API 
และ ในการยิง API ให้มีการตรวจสอบด้วยวิธีการแบบ OAuth2!*/