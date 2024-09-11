const fs = require("node:fs");

console.log("Leyendo el archivo 1...");
fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  // <-- ejecutas este callback cuando termina de leer el archivo
  console.log(text);
});

console.log("haciendo cosas mientras lee el archivo...");

console.log("Leyendo el archivo 2...");
fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log(text);
});
