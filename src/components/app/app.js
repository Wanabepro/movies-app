import React, { Component } from 'react'

import FilmsList from '../filmsList'

import './app.css'

class App extends Component {
  constructor() {
    super()

    this.fetchFilms()
  }

  state = {
    films: [],
  }

  fetchFilms = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTg0Y2ExYzRiMjJkNzUyZGEwMDEwZDI5NWVlMzE4YiIsInN1YiI6IjY0Zjg2YzQzZTBjYTdmMDBlYzg5ZTgzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KZ1OtWtfpYsOPXdakScA01_cOmdUohkt-LzyRO83AoM',
      },
    }

    const response1 = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    const { genres } = await response1.json()

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = await response.json()
    this.setState({
      films: data.results.map((film) => ({
        id: film.id,
        genres: film.genre_ids.map((genreId) => genres.find((genre) => genre.id === genreId).name),
        title: film.title,
        overview: film.overview,
        posterPath: film.poster_path,
        releaseDate: film.release_date,
        rating: film.vote_average,
      })),
    })
  }

  render() {
    const { films } = this.state
    return <FilmsList films={films} />
  }
}

export default App
