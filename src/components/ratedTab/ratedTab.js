import React, { Component } from 'react'
import { Alert, Spin } from 'antd'

import FilmsList from '../filmsList'
import Pagination from '../pagination'

class RatedTab extends Component {
  state = {
    films: [],
    isLoading: false,
    error: {
      isError: false,
      errorMessage: null,
    },
    filmsCount: 1,
    page: 1,
  }

  componentDidMount() {
    this.onFilmSearch()
  }

  onFilmSearch = async (page = 1) => {
    this.setState({ isLoading: true })

    try {
      const { films, filmsCount } = await this.props.api.getRatedMovies(page)
      this.setState({ films, filmsCount, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.onFilmSearch(page)
  }

  onRatingError = (error) => {
    this.setState({ error: { isError: true, errorMessage: error.message } })
  }

  render() {
    const { api } = this.props
    const {
      films,
      isLoading,
      error: { isError, errorMessage },
      filmsCount,
      page,
    } = this.state

    const filmsListProps = {
      films,
      rateMovie: api.rateMovie,
      onRatingError: this.onRatingError,
    }

    const paginationProps = {
      current: page,
      total: filmsCount,
      onChange: this.onPageChange,
    }

    return (
      <>
        {!(isLoading || isError) && Boolean(films.length) && <FilmsList {...filmsListProps} />}
        {!films.length && !isLoading && !isError && <h1 className="search-message">No rated movies</h1>}
        {isLoading && (
          <Spin size="large" tip="Films loading...">
            <div className="content" />
          </Spin>
        )}
        {isError && <Alert message="Something goes wrong" description={errorMessage} type="error" closable showIcon />}
        <Pagination {...paginationProps} />
      </>
    )
  }
}

export default RatedTab
