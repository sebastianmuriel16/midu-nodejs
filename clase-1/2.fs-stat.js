const fs = require("node:fs");

const stats = fs.statSync("./archivo.txt");

console.log(
  stats.isFile() ? "es un archivo" : "no es un archivo",
  stats.isDirectory() ? "es un directorio" : "no es un directorio",
  stats.isSymbolicLink()
    ? "es un enlace simbolico"
    : "no es un enlace simbolico",
  stats.size // tamaño en bytes
);
