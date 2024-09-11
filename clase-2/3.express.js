const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
}
)

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en bdb
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1> Página no encontrada </h1>')
})

app.listen(PORT, () => {
  console.log(`escuchando en el puerto http://localhost:${PORT}`)
})
