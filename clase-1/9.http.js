const http = require('node:http')
const { findAviablePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000
console.log(`Desired port: ${desiredPort}`)

const server = http.createServer((req, res) => {
  console.log('request recived')
  res.end('Hola mundo')
})

findAviablePort(2371).then(port => {
  server.listen(port, () => {
    console.log(`escuchando en el puerto http://localhost:${server.address().port}`)
  })
})
