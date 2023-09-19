import React from 'react'
import { Pagination as AntdPagination } from 'antd'

import './pagination.css'

function Pagination({ current, total, onChange }) {
  const paginationProps = {
    hideOnSinglePage: true,
    showSizeChanger: false,
    defaultCurrent: 1,
    pageSize: 20,
    current,
    total,
    onChange,
  }

  return (
    <div className="pagination">
      <AntdPagination {...paginationProps} />
    </div>
  )
}

export default Pagination
