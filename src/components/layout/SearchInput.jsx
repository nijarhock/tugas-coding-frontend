import React, { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'

export default function SearchInput({ tambahLink, handleSearchChange, values }) {
  const [search, setsearch] = useState(values.search);

  const handleChange = (e) => {
    setsearch(e.target.value);
    handleSearchChange("search", e.target.value);
  }
  return (
    <div className="card-header">
      <h4>
        {tambahLink && (
          <Link to={tambahLink} className="btn btn-primary btn-lg mr-2">Tambah</Link>
        )}
      </h4>
      <div className="card-header-form">
        <form>
          <div className="form-group">
            <input type="text" 
              className="form-control" 
              placeholder="Search" 
              name="search"
              onChange={handleChange}
              value={search}/>
          </div>
        </form>
      </div>
    </div>
  )
}