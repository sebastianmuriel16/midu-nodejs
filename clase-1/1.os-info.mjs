import {
  platform,
  version,
  arch,
  freemem,
  totalmem,
  homedir,
  cpus,
} from "node:os";

console.log("Informacion del sistema:");
console.log(platform());

console.log("Version del sistema:");
console.log(version());

console.log("Arquitectura del sistema:");
console.log(arch());

console.log("Memoria disponible:");
console.log(freemem() / 1024 / 1024);

console.log("Memoria total:");
console.log(totalmem() / 1024 / 1024);

console.log("Path del sistema:");
console.log(homedir());

console.log("cpu: ", cpus().length);
