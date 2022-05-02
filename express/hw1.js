function solvegame24(nums) {
    let res = ""
    return new Promise((resolve, reject) => {
        var ar = []
        var order = [0, 1, 2]
        var op = []
        var val = [];
        var MX = 9999
        var oper = "+-*/"
        var out;

        function rnd(n) { return Math.floor(Math.random() * n) }

        function getvalue(x, dir) {
            var r = MX;
            if (dir > 0) ++x;
            while (1) {
                if (val[x] != MX) {
                    r = val[x];
                    val[x] = MX;
                    break;
                }
                x += dir;
            }
            return r * 1;
        }

        function calc() {
            var c = 0,
                l, r, x;
            val = ar.join('/').split('/');
            while (c < 3) {
                x = order[c];
                l = getvalue(x, -1);
                r = getvalue(x, 1);
                switch (op[x]) {
                    case 0:
                        val[x] = l + r;
                        break;
                    case 1:
                        val[x] = l - r;
                        break;
                    case 2:
                        val[x] = l * r;
                        break;
                    case 3:
                        if (!r || l % r) return 0;
                        val[x] = l / r;
                }
                ++c;
            }
            return getvalue(-1, 1);
        }

        function shuffle(s, n) {
            var x = n,
                p = eval(s),
                r, t;
            while (x--) {
                r = rnd(n);
                t = p[x];
                p[x] = p[r];
                p[r] = t;
            }
        }

        function parenth(n) {
            while (n > 0) --n, out += '(';
            while (n < 0) ++n, out += ')';
        }

        function getpriority(x) {
            for (var z = 3; z--;)
                if (order[z] == x) return 3 - z;
            return 0;
        }

        function showsolution() {
            var x = 0,
                p = 0,
                lp = 0,
                v = 0;
            while (x < 4) {
                if (x < 3) {
                    lp = p;
                    p = getpriority(x);
                    v = p - lp;
                    if (v > 0) parenth(v);
                }
                out += ar[x];
                if (x < 3) {
                    if (v < 0) parenth(v);
                    out += oper.charAt(op[x]);
                }
                ++x;
            }
            parenth(-p);
            //  say(out);
            console.log({ out })
            result = out;
            return resolve(out)
        }

        function solve24(s) {
            var z = 4,
                r;
            while (z--) ar[z] = s.charCodeAt(z) - 48;
            out = "";
            for (z = 100000; z--;) {
                r = rnd(256);
                op[0] = r & 3;
                op[1] = (r >> 2) & 3;
                op[2] = (r >> 4) & 3;
                shuffle("ar", 4);
                shuffle("order", 3);
                if (calc() != 24) continue;
                showsolution();
                break;
            }
            if (result == "") {
                return reject()
            }
            console.log('end')
        }

        solve24(nums)
    })
}

const express = require('express');

const app = express();
app.use(express.json());

app.get('/:nums', (request, response) => {


    if (!request.params.nums) return response.status(403).send('error no data')

    let nums = /^[1-9]{4,4}$/
    if (!nums.exec(request.params.nums)) return response.status(403).send('error data')

    console.log(request.params.nums)

    solvegame24(request.params.nums).then(res => {
        response.send("ผลลัพธ์ : " + res)
    }).catch((e) => {
        console.log({ e })
        return response.status(403).send('error no solution')
    })

})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});