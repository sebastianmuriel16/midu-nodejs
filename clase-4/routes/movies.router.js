import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.post('/', MovieController.create)

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/:id', MovieController.update)

// moviesRouter.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//   }
//   res.send(200)
// })
