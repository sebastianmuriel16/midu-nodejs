const fs = require("node:fs");

console.log("Leyendo el archivo 1...");
const text = fs.readFileSync("./archivo.txt", "utf-8");
console.log(text);

console.log("haciendo cosas mientras lee el archivo...");

console.log("Leyendo el archivo 2...");
const text2 = fs.readFileSync("./archivo2.txt", "utf-8");
console.log(text2);
