import React, { Component } from 'react'
import { Alert, Spin } from 'antd'

import Api from '../../services/api'
import FilmsList from '../filmsList'

import './app.css'

class App extends Component {
  api = new Api()

  state = {
    films: [],
    isLoading: true,
    error: {
      isError: false,
      errorMessage: null,
    },
  }

  componentDidMount() {
    this.fetchFilms()
  }

  fetchFilms = async () => {
    try {
      const films = await this.api.getFilms()
      this.setState({ films, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error: { isError: true, errorMessage: error.message } })
    }
  }

  render() {
    const {
      films,
      isLoading,
      error: { isError, errorMessage },
    } = this.state
    return (
      <>
        {!(isLoading || isError) && <FilmsList films={films} />}
        {isLoading && (
          <Spin size="large" tip="Films loading...">
            <div className="content" />
          </Spin>
        )}
        {isError && <Alert message="Something goes wrong" description={errorMessage} type="error" closable />}
      </>
    )
  }
}

export default App
