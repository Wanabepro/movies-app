import React from 'react'
import { Tabs } from 'antd'

import './filter.css'

function Filter() {
  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]
  return (
    <div className="filters">
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarGutter={16}
        tabBarStyle={{ fontFamily: '"Inter", sans-serif', fontSize: '1.4rem' }}
      />
    </div>
  )
}

export default Filter
