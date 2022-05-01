let textarr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let ans = '';
for (let i = 0; i < 26; i++) {

    ans += textarr[i + 2] + "\n" + textarr[i] + "\n";
}
console.log(ans);