let textarr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let ans = '';
for (let i = 0; i < 26; i += 2) {

    ans += textarr[i + 1] + "\n" + textarr[i] + "\n";
}
console.log(ans);