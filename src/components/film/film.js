import React, { Component } from 'react'
import format from 'date-fns/format'
import { Rate } from 'antd'

import ratingColorResolver from '../../helpers/ratingColorResolver'
import FilmGenre from '../filmGenre'

import './film.css'

class Film extends Component {
  state = {
    myRating: 0,
    isLoading: false,
  }

  componentDidMount() {
    const { id } = this.props
    this.setState({ myRating: Number(localStorage.getItem(id)) })
  }

  onRatingChange = async (value) => {
    this.setState({ isLoading: true })

    await this.props.rateMovie(this.props.id, value)

    this.setState({ myRating: value })
    this.setState({ isLoading: false })
  }

  render() {
    const { posterPath, title, overview, releaseDate, genres, rating } = this.props
    const { myRating, isLoading } = this.state

    const formatedDate = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy', { weekStartsOn: 1 }) : null

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
          <Rate className="rate" disabled={isLoading} count={10} value={myRating} onChange={this.onRatingChange} />
        </section>
      </article>
    )
  }
}

export default Film
