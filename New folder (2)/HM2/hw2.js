const letter = ["A", "B","C", "D","E", "F","G", "H","I", "J", "k", "L","M", "N","O", "P","Q", "R", "S","T", "U","V", "W", "X", "Y", "Z"] ;

let result ="";

for( let i = 0; i < 26 ; i+=2) {

    result += letter[i + 1] + "  " + letter[i] + "  " ;

}

console.log(result);
