import React from 'react'

import Film from '../film'

import './filmsList.css'

function FilmsList({ films }) {
  return (
    <ul className="filmsList">
      {films.map((film) => (
        <li key={film.id}>
          <Film {...film} />
        </li>
      ))}
    </ul>
  )
}

export default FilmsList
