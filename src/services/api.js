class Api {
  baseUrl = 'https://api.themoviedb.org/3'

  apiKey = '9984ca1c4b22d752da0010d295ee318b'

  commonOptions = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  sessionId

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

  async createGuestSession() {
    const sessionEnd = new Date(localStorage.getItem('expiresAt')).getTime()
    const now = new Date().getTime()

    if (now <= sessionEnd) {
      this.sessionId = localStorage.getItem('sessionId')
    } else {
      const options = {
        ...this.commonOptions,
        method: 'GET',
      }

      const { guest_session_id: sessionId, expires_at: expiresAt } = await Api.fetchResource(
        `${this.baseUrl}/authentication/guest_session/new?api_key=${this.apiKey}`,
        options,
      )

      localStorage.setItem('expiresAt', expiresAt)
      localStorage.setItem('sessionId', sessionId)

      this.sessionId = sessionId
    }
  }

  rateMovie = async (movieId, rating) => {
    if (rating === 0) {
      return this.unrateMovie(movieId)
    }
    const options = {
      ...this.commonOptions,
      method: 'POST',
      body: JSON.stringify({ value: rating }),
    }

    const response = await Api.fetchResource(
      `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${this.sessionId}`,
      options,
    )

    return response
  }

  unrateMovie = async (movieId) => {
    const options = {
      ...this.commonOptions,
      method: 'DELETE',
    }

    const response = await Api.fetchResource(
      `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${this.sessionId}`,
      options,
    )

    return response
  }

  async getRatedMovies(page = 1) {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const { results, total_results: filmsCount } = await Api.fetchResource(
      `${this.baseUrl}/guest_session/${this.sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
      options,
    )
    const films = Api.#transformFilms(results)

    return { films, filmsCount }
  }

  async getGenres() {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const { genres } = await Api.fetchResource(
      `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en`,
      options,
    )

    return Api.#transformGenres(genres)
  }

  async searchFilm(filmName, page = 1) {
    const options = {
      ...this.commonOptions,
      method: 'GET',
    }

    const { results, total_results: filmsCount } = await Api.fetchResource(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${filmName}&include_adult=false&language=en-US&page=${page}`,
      options,
    )
    const films = Api.#transformFilms(results)

    return { films, filmsCount }
  }

  static #transformFilms(films) {
    return films.map((film) => ({
      id: film.id,
      genres: film.genre_ids,
      title: film.title,
      overview: film.overview,
      posterPath: film.poster_path,
      releaseDate: film.release_date,
      rating: film.vote_average,
      myRating: film.rating || 0,
    }))
  }

  static #transformGenres(genres) {
    const genresEntries = genres.map(({ id, name }) => [id, name])
    return Object.fromEntries(genresEntries)
  }
}

export default Api
