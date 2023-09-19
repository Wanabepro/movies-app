import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { Alert, Spin } from 'antd'

import Search from '../search'
import FilmsList from '../filmsList'
import Pagination from '../pagination'

class SearchTab extends Component {
  state = {
    searchString: '',
    films: [],
    isLoading: false,
    error: {
      isError: false,
      errorMessage: null,
    },
    filmsCount: 1,
    page: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchString } = this.state

    if (prevState.searchString !== searchString) {
      this.setState({ page: 1 })
      this.onFilmSearch(searchString)
    }
  }

  onSearchStringChange = (searchString) => {
    this.setState({ searchString })
  }

  onFilmSearch = async (filmName, page = 1) => {
    this.setState({ isLoading: true })

    try {
      const { films, filmsCount } = await this.props.api.searchFilm(filmName, page)
      this.setState({ films, filmsCount, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.onFilmSearch(this.state.searchString, page)
  }

  render() {
    const { api } = this.props
    const {
      searchString,
      films,
      isLoading,
      error: { isError, errorMessage },
      filmsCount,
      page,
    } = this.state

    const paginationProps = {
      current: page,
      total: filmsCount,
      onChange: this.onPageChange,
    }

    const filmsListProps = {
      films,
      rateMovie: api.rateMovie,
    }

    return (
      <>
        <Search onSearchStringChange={debounce(this.onSearchStringChange, 500)} />
        {!(isLoading || isError) && Boolean(films.length) && <FilmsList {...filmsListProps} />}
        {!films.length && !isLoading && Boolean(searchString.length) && (
          <h1 className="search-message">Nothing found</h1>
        )}
        {!films.length && !isLoading && !isError && !searchString.length && (
          <h1 className="search-message">Search something</h1>
        )}
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

export default SearchTab
