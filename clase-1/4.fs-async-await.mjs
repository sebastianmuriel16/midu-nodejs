import fs from "node:fs/promises";

console.log("Leyendo el archivo 1...");
const text = await fs.readFile("./archivo.txt", "utf-8");
console.log(text);

console.log("haciendo cosas mientras lee el archivo...");

console.log("Leyendo el archivo 2...");
const text2 = await fs.readFile("./archivo2.txt", "utf-8");
console.log(text2);
