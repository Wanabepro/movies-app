class Api {
  baseUrl = 'https://api.themoviedb.org/3'

  // eslint-disable-next-line prettier/prettier
  token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg0Y2ExYzRiMjJkNzUyZGEwMDEwZDI5NWVlMzE4YiIsInN1YiI6IjY0Zjg2YzQzZTBjYTdmMDBlYzg5ZTgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KZ1OtWtfpYsOPXdakScA01_cOmdUohkt-LzyRO83AoM'

  commonOptions = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    },
  }

  static async fetchResource(url, options = {}) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(
          `Could not fetch resource ${url}, status code: ${response.status}${
            response.statusText ? ` - ${response.statusText}` : ''
          }.`,
        )
      }
      return response.json()
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Could not fetch anything. Check Your internet connection.')
      }
      throw new Error(error.message)
    }
  }

  async getFilms(page) {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const genres = await this.#getGenres()
    const { results, total_pages: pagesCount } = await Api.fetchResource(
      `${this.baseUrl}/movie/popular?language=en-US&page=${page}`,
      options,
    )
    const films = Api.#transformFilms(results, genres)

    return { films, pagesCount }
  }

  async searchFilm(filmName, page = 1) {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const genres = await this.#getGenres()
    const { results, total_pages: pagesCount } = await Api.fetchResource(
      `${this.baseUrl}/search/movie?query=${filmName}&include_adult=false&language=en-US&page=${page}`,
      options,
    )
    const films = Api.#transformFilms(results, genres)

    return { films, pagesCount }
  }

  async #getGenres() {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const { genres } = await Api.fetchResource(`${this.baseUrl}/genre/movie/list?language=en`, options)
    return genres
  }

  static #transformFilms(films, genres) {
    return films.map((film) => ({
      id: film.id,
      genres: film.genre_ids.map((genreId) => genres.find((genre) => genre.id === genreId).name),
      title: film.title,
      overview: film.overview,
      posterPath: film.poster_path,
      releaseDate: film.release_date,
      rating: film.vote_average,
    }))
  }
}

export default Api
