const http = require('node:http')

// common js -> modulos clasicos de node

const ditto = require('./pokemon/ditto.json')

const proccesRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(ditto))

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Página no encontrada</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamado a una base de datos
            res.writeHeader(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }

        default:{
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/textplain; charset=utf-8')
          return res.end('404 not found')
        }
      }
  }
}

const server = http.createServer(proccesRequest)

server.listen(1234, () => {
  console.log('escuchando en el puerto http://localhost:1234')
})
