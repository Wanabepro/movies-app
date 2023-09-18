import React from 'react'
import format from 'date-fns/format'
import { Rate } from 'antd'

import ratingColorResolver from '../../helpers/ratingColorResolver'
import FilmGenre from '../filmGenre'

import './film.css'

// eslint-disable-next-line max-len
function Film({ id, posterPath, title, overview, releaseDate, genres, rating, myRating, rateMovie }) {
  const formatedDate = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy', { weekStartsOn: 1 }) : null

  const onRatingChange = (value) => {
    rateMovie(id, value)
  }

  return (
    <article className="film">
      <img
        className="film__poster"
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/original/${posterPath}`
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYA8-qGTLi1IgFbY7XZHm0Fjd2qYUFBrvlZw&usqp=CAU'
        }
        alt="Film poster"
      />
      <section className="film__content">
        <header className="film__header">
          <h2 className="film__heading">{title}</h2>
          <div className="film__rating" style={{ borderColor: ratingColorResolver(rating) }}>
            {rating.toFixed(1)}
          </div>
        </header>
        {formatedDate && <span className="film__date">{formatedDate}</span>}
        <ul className="film__genres">
          {genres.map((genreId) => (
            <li key={genreId}>
              <FilmGenre genreId={genreId} />
            </li>
          ))}
        </ul>
        <p className="film__description">{overview}</p>
        <Rate className="rate" count={10} defaultValue={myRating} onChange={onRatingChange} />
      </section>
    </article>
  )
}

export default Film
