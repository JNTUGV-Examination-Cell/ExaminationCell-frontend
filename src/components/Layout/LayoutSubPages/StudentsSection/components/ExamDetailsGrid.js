import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const ExamDetailsGrid = ({rows, columns}) => {
  return (
    <div>
        <DataGrid 
          columns={columns}
          rows={rows}
        />
    </div>
  )
}

export default ExamDetailsGrid;