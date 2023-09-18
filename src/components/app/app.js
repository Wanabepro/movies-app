import React, { Component } from 'react'
import { Alert, Tabs } from 'antd'

import { GenresProvider } from '../../services/genresContext'
import Api from '../../services/api'
import SearchTab from '../searchTab'
import RatedTab from '../ratedTab'

import './app.css'

class App extends Component {
  api = new Api()

  state = {
    error: {
      isError: false,
      errorMessage: '',
    },
    genres: {},
  }

  componentDidMount() {
    this.api
      .getGenres()
      .then((genres) => {
        this.setState({ genres })
      })
      .catch((error) => {
        this.setState({ error: { isError: true, errorMessage: error.message } })
      })

    this.api.createGuestSession()
  }

  render() {
    const {
      error: { isError, errorMessage },
      genres,
    } = this.state

    const items = [
      {
        key: '1',
        label: 'Search',
        children: <SearchTab api={this.api} />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <RatedTab api={this.api} />,
      },
    ]

    return (
      <GenresProvider value={genres}>
        {isError && <Alert message="Something goes wrong" description={errorMessage} type="error" closable showIcon />}
        <Tabs
          centered
          defaultActiveKey="1"
          destroyInactiveTabPane
          items={items}
          tabBarGutter={16}
          tabBarStyle={{ fontFamily: '"Inter", sans-serif', fontSize: '1.4rem' }}
        />
      </GenresProvider>
    )
  }
}

export default App
