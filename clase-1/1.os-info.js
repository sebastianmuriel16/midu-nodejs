const os = require('node:os')

console.log('Informacion del sistema:')
console.log(os.platform())

console.log('Version del sistema:')
console.log(os.version())

console.log('Arquitectura del sistema:')
console.log(os.arch())

console.log('Memoria disponible:')
console.log(os.freemem() / 1024 / 1024)

console.log('Memoria total:')
console.log(os.totalmem() / 1024 / 1024)

console.log('Path del sistema:')
console.log(os.homedir())
console.log('cpu: ', os.cpus().length)
