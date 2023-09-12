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
    isLoading: true,
    error: {
      isError: false,
      errorMessage: null,
    },
    pagesCount: 1,
  }

  componentDidMount() {
    this.fetchFilms()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchString } = this.state

    if (prevState.searchString !== searchString) {
      this.onFilmSearch(searchString)
    }
  }

  fetchFilms = async () => {
    try {
      this.api.searchFilm('')
      const { films, pagesCount } = await this.api.getFilms(1)
      this.setState({ films, pagesCount, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
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
    this.onFilmSearch(this.state.searchString, page)
  }

  render() {
    const {
      films,
      isLoading,
      error: { isError, errorMessage },
      pagesCount,
    } = this.state

    const paginationProps = {
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
        {!(isLoading || isError) && <FilmsList films={films} />}
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
