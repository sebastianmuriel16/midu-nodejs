import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre])
      // not genre found
      if (!genres.length) return []
      // get the id from the first genre result
      const [{ id }] = genres

      const [movies] = await connection.query('SELECT BIN_TO_UUID(movie.id) id ,title, year, director, duration, poster, rate, genre.name AS genre FROM movie JOIN movie_genres ON movie.id = movie_genres.movie_id JOIN genre ON movie_genres.genre_id = genre.id WHERE genre.id = ?;', [id])

      return movies
    }

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate FROM movie;')
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(`SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate
       FROM movie WHERE id = UUID_TO_BIN(?);`, [id])

    if (!movie.length) return null
    return movie[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    // insert genre ???

    // insert movie
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id,title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (err) {
    // puedes enviar informacion sensible
      throw new Error('Something went wrong', { cause: err })
    }
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate
      FROM movie
      WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}
