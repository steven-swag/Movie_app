import React from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

function Pagination({page, totalPages, onPageChange}) {
  const lastPage = Math.min(totalPages || 1, 500)

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeft size={17} />
        Previous
      </button>

      <span>
        Page <strong>{page}</strong> of <strong>{lastPage}</strong>
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= lastPage}
      >
        Next
        <ChevronRight size={17} />
      </button>
    </div>
  )
}

export default Pagination
