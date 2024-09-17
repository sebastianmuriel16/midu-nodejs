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

      const [movies] = await connection.query(`SELECT BIN_TO_UUID(movie.id) id ,title, year, director, duration, poster, rate, genre.name AS genre FROM movie
         JOIN movie_genres ON movie.id = movie_genres.movie_id 
         JOIN genre ON movie_genres.genre_id = genre.id WHERE genre.id = ?;`, [id])

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
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id,title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )

      // // insert genre
      // await connection.query(
      //   'INSERT INTO genre (name) VALUES (?);', [genreInput]
      // )
      // search genre id
      const [genres] = await connection.query(
        'SELECT id FROM genre WHERE name = ?;', [genreInput]
      )
      const genreId = genres.length > 0 ? genres[0].id : undefined

      // insert genre relation
      await connection.query(
        'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
        [uuid, genreId]
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

  static async delete ({ id }) {
    const [movies] = await connection.query(
      'select 1 from movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (!movies.length) return null

    try {
      await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
      const [genres] = await connection.query(
        'SELECT genre_id FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);',
        [id]
      )
      await connection.query(
        'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?) AND genre_id = ?;',
        [id, genres[0].genre_id]
      )
    } catch (err) {
      throw new Error('Something went wrong', { cause: err })
    }

    return movies[0]
  }

  static async update ({ id, input }) {
    // validate id
    const [movies] = await connection.query(
      'select 1 from movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    if (!movies.length) return null

    const fields = Object.keys(input).filter(key => input[key] !== undefined && input[key] !== null)
    const values = Object.values(input).filter(value => value !== undefined && value !== null)

    if (fields.length === 0) return 'No fields to update'

    const setClause = fields.map(field => `${field} = ?`).join(', ')
    values.push(id)
    const sql = `UPDATE movie SET ${setClause} WHERE id = UUID_TO_BIN(?);`
    try {
      await connection.query(sql, values)
    } catch (err) {
      throw new Error('Something went wrong', { cause: err })
    }

    const [updatedMovie] = await connection.query(
      'SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )
    return updatedMovie
  }
}
