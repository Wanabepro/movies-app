import React from 'react'
import { format } from 'date-fns'

import FilmGenre from '../filmGenre'

import './film.css'

function Film({ posterPath, title, overview, releaseDate, genres }) {
  const convertedDate = format(new Date(releaseDate), 'MMMM d, yyy')

  return (
    <article className="film">
      <img className="film__poster" src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt="Film poster" />
      <section className="film__content">
        <h2 className="film__header">{title}</h2>
        <span className="film__date">{convertedDate}</span>
        <ul className="film__genres">
          {genres.map((genre) => (
            <li key={genre}>
              <FilmGenre genre={genre} />
            </li>
          ))}
        </ul>
        <p className="film__description">{overview}</p>
      </section>
    </article>
  )
}

export default Film
