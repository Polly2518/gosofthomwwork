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

app.get('/input/:number1/:number2/:number3/:number4', (req, res) => {

    let inputnum1 = parseInt(req.params.number1)
    let inputnum2 = parseInt(req.params.number2)
    let inputnum3 = parseInt(req.params.number3)
    let inputnum4 = parseInt(req.params.number4)

    //res.send('num1 :' + inputnum1 + ' num2 :' + inputnum2 + ' num3 :' + inputnum3 + ' num4 :' + inputnum4);
    if (typeof inputnum1 && typeof inputnum2 && typeof inputnum3 && typeof inputnum4 === 'number' && inputnum1 && inputnum2 && inputnum3 && inputnum4 < 10) {
        res.status(200)
        res.send('NUMBER CHECKED')

    } else {
        res.status(403)
        res.send('INPUT VALUE IS MORE THEN 9')

    }

})


app.get('/getdata', function(req, res) {

    return res.status(200).send('hello')

})



app.listen(3000, () => {
    console.log('Listening on port: 3000');
});