import React from 'react'
import format from 'date-fns/format'

import FilmGenre from '../filmGenre'

import './film.css'

function Film({ posterPath, title, overview, releaseDate, genres }) {
  const formatedDate = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy', { weekStartsOn: 1 }) : null

  return (
    <article className="film">
      <img className="film__poster" src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt="Film poster" />
      <section className="film__content">
        <h2 className="film__header">{title}</h2>
        {formatedDate && <span className="film__date">{formatedDate}</span>}
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
