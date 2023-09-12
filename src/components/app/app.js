import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { Alert, Spin, Pagination } from 'antd'

import Api from '../../services/api'
import FilmsList from '../filmsList'
import Filter from '../filter'
import Search from '../search'

import './app.css'

class App extends Component {
  api = new Api()

  state = {
    searchString: '',
    films: [],
    isLoading: false,
    error: {
      isError: false,
      errorMessage: null,
    },
    pagesCount: 1,
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
      const { films, pagesCount } = await this.api.searchFilm(filmName, page)
      this.setState({ films, pagesCount, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
    }
  }

  onPageChange = (page) => {
    this.setState({ page })
    this.onFilmSearch(this.state.searchString, page)
  }

  render() {
    const {
      searchString,
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

    return (
      <>
        <Filter />
        <Search onSearchStringChange={debounce(this.onSearchStringChange, 500)} />
        {!(isLoading || isError) && Boolean(films.length) && <FilmsList films={films} />}
        {!films.length && !isLoading && Boolean(searchString.length) && (
          <h1 className="search-message">Nothing found</h1>
        )}
        {!films.length && !isLoading && !searchString.length && <h1 className="search-message">Search something</h1>}
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

export default App
