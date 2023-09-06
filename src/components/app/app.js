import React, { Component } from 'react'

import './app.css'

class App extends Component {
  state = {
    tasks: [],
    filter: 'All',
  }

  render() {
    const { tasks, filter } = this.state
    return (
      <header className="header">
        <h1>
          todos
          {filter}
        </h1>
        {tasks}
      </header>
    )
  }
}

export default App
