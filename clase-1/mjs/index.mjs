// .js --> por defecto utiliza CommonJS
// .mjs --> para utilizar ECMAScript Modules, nota es la que esta en la especificacion oficial de javascript
// .cjs --> para utilizar CommonJS

import { sum, sub, mul } from "./sum.mjs";

console.log(sum(1, 2));
console.log(sub(4, 0));
console.log(mul(8, 0));
