import React, { Component } from 'react'
import { Alert, Spin, Pagination } from 'antd'

import FilmsList from '../filmsList'

class RatedTab extends Component {
  state = {
    films: [],
    isLoading: false,
    error: {
      isError: false,
      errorMessage: null,
    },
    pagesCount: 1,
    page: 1,
  }

  componentDidMount() {
    this.onFilmSearch()
  }

  onFilmSearch = async (page = 1) => {
    this.setState({ isLoading: true })

    try {
      const { films, pagesCount } = await this.props.api.getRatedMovies(page)
      this.setState({ films, pagesCount, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.onFilmSearch(page)
  }

  render() {
    const { api } = this.props
    const {
      films,
      isLoading,
      error: { isError, errorMessage },
      pagesCount,
      page,
    } = this.state

    const paginationProps = {
      current: page,
      hideOnSinglePage: true,
      showSizeChanger: false,
      defaultCurrent: 1,
      total: pagesCount,
      onChange: this.onPageChange,
    }

    const filmsListProps = {
      films,
      rateMovie: api.rateMovie,
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
        <div className="pagination">
          <Pagination {...paginationProps} />
        </div>
      </>
    )
  }
}

export default RatedTab
