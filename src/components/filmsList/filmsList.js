import React from 'react'

import Film from '../film'

import './filmsList.css'

function FilmsList({ films, rateMovie, onRatingError }) {
  return (
    <ul className="filmsList">
      {films.map((film) => (
        <li key={film.id}>
          <Film {...film} rateMovie={rateMovie} onRatingError={onRatingError} />
        </li>
      ))}
    </ul>
  )
}

export default FilmsList
