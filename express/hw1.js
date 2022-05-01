const express = require('express');

const app = express();
app.use(express.json());
/*ให้ทำการสร้าง File hw1.js 
โดยให้สร้าง Router ในการ รับข้อมูล เลขจำนวน 4 ตัวเลข โดยตัวเลขทั้ง 4 จะต้องเป็นจำนวนที่ไม่เกิน 1-9 
ถ้าหากมีตัวเลขใดใน 4 ตัวเป็นเลขที่มีค่าเกินกว่า 1-9 ให้ทำการ Return Response เป็น 403 กลับไป 

แต่ถ้าตัวเลขทั้ง 4 ตัวเลขนั้น เป็นตัวเลข 1-9 ทั้งหมด ให้นำตัวเลขทั้ง 4 นั้นมาคำนวนว่า สามารถ บวก ลบ คูณ หรือ หาร แล้วได้เลขเป็น 24 หรือไม่ 

ถ้าหากได้ให้ Return Response สูตรในการคำนวน และ บอกว่า Success แต่ถ้าไม่สามารถทำได้ให้ Return Response บอกว่า Fail
*/
let data = [];

app.get('/input/:number', function(req, res) {

    let inputnum = req.params.number
    console.log(inputnum)


})

app.get('/getdata', function(req, res) {

    return res.status(200).send('hello')

})



app.listen(3000, () => {
    console.log('Listening on port: 3000');
});