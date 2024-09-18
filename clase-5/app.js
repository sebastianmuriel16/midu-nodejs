import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.router.js'
import { corsMiddleware } from './middlewares/cors.js'

// como leer un json en ESModules
// import fs from 'fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// como leer un json en EsModules recomendado por ahora

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware)
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`escuchando en el puerto http://localhost:${PORT}`)
  })
}

// app.get('/', (req, res) => {
//   res.json({ Message: 'Hello World' })
// })

// metodos normales: GET/HEAD/POST

// metodos con complejos: PUT/PATCH/DELETE
// CORS preflight
// OPTIONS

// app.get('/movies', todo)

// app.get('/movies/:id', todo)

// app.post('/movies', todo)

// app.patch('/movies/:id', todo)

// app.delete('/movies/:id', todo)
