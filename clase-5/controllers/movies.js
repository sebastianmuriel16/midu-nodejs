// import { MovieModel } from '../models/movie.js'
import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, partialValidateMovie } from '../schemas/movies.js'
export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    // que es lo que se renderiza
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    //   const origin = req.header('origin')

    //   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    //   }
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (!result) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted' })

    // const { id } = req.params
    // const movie = await MovieModel.getById({ id })
    // if (movie) return res.json(movie)
    // res.status(404).json({ message: 'Movie not found' })
  }

  static async update (req, res) {
    const { id } = req.params
    const result = partialValidateMovie(req.body)

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
