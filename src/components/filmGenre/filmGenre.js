import React from 'react'

import './filmGenre.css'
import { GenresConsumer } from '../../services/genresContext'

function FilmGenre({ genreId }) {
  return <GenresConsumer>{(genres) => <div className="genre">{genres[genreId]}</div>}</GenresConsumer>
}

export default FilmGenre
