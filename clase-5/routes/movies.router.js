import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)
  moviesRouter.post('/', movieController.create)

  moviesRouter.get('/:id', movieController.getById)
  moviesRouter.delete('/:id', movieController.delete)
  moviesRouter.patch('/:id', movieController.update)

  return moviesRouter
}

// moviesRouter.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.send(200)
// })
