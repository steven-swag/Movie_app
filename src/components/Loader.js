import React from 'react'

function Loader() {
  return (
    <div className="status-message" role="status">
      <span className="spinner" />
      Loading movies...
    </div>
  )
}

export default Loader
