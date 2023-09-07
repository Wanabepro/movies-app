import React from 'react'

import Film from '../film'

import './filmList.css'

function FilmsList({ films }) {
  return (
    <ul className="filmList">
      {films.map((film) => (
        <li key={film.id}>
          <Film {...film} />
        </li>
      ))}
    </ul>
  )
}

export default FilmsList
