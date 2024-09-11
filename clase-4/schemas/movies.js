import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'title must be a string',
    required_error: 'title is required'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(3),
  poster: z.string().url({
    Message: 'poster must be a valid url'
  }),
  genre: z.array(z.enum([
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Romance',
    'Thriller',
    'Sci-Fi',
    'Crime'
  ]))

})

export function validateMovie (input) {
  return movieSchema.safeParse(input)
}

export function partialValidateMovie (input) {
  return movieSchema.partial().safeParse(input)
}
