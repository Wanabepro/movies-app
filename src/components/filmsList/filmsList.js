import React from 'react'

import Film from '../film'

import './filmsList.css'

function FilmsList({ films, rateMovie }) {
  return (
    <ul className="filmsList">
      {films.map((film) => (
        <li key={film.id}>
          <Film {...film} rateMovie={rateMovie} />
        </li>
      ))}
    </ul>
  )
}

export default FilmsList
