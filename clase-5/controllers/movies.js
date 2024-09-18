// import { MovieModel } from '../models/movie.js'
// import { MovieModel } from '../models/mysql/movie.js'
import { validateMovie, partialValidateMovie } from '../schemas/movies.js'
export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    // que es lo que se renderiza
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    //   const origin = req.header('origin')

    //   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    //   }
    const { id } = req.params

    const result = await this.movieModel.delete({ id })

    if (!result) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted' })

    // const { id } = req.params
    // const movie = await MovieModel.getById({ id })
    // if (movie) return res.json(movie)
    // res.status(404).json({ message: 'Movie not found' })
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = partialValidateMovie(req.body)

    const updatedMovie = await this.movieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
