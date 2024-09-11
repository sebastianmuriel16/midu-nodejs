const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234
console.log(`Desired port: ${desiredPort}`)

const proccesRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  console.log(req.url)
  if (req.url === '/') {
    res.statusCode = 200 // ok
    res.end('<h1>Bienvenido a mi página  de inicio!!!</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Página de contacto</h1>')
  } else if (req.url === '/imagen-server') {
    fs.readFile('./cyberpunk.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Error al cargar la imagen</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>Página no encontrada</h1>')
  }
}
const server = http.createServer(proccesRequest)

server.listen(desiredPort, () => {
  console.log(`escuchando en el puerto http://localhost:${desiredPort}`)
})
