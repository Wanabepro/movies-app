import React, { Component } from 'react'
import { Input } from 'antd'

import './search.css'

class Search extends Component {
  state = {
    value: '',
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
    this.props.onSearchStringChange(e.target.value)
  }

  render() {
    const { value } = this.state

    return (
      <Input
        className="search"
        placeholder="Type to search..."
        style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.6rem' }}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

export default Search
