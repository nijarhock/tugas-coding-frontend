import React, { useState, useEffect } from 'react'

export default function ButtonSortir({ handleSearchChange, values, name }) {
  const [toggle, settoggle] = useState(values.orderBy[0] === name)
  console.log(values.orderBy[0])
  useEffect(() => {
    let ascending = toggle ? "asc" : "desc";
    handleSearchChange("orderBy", [name, ascending]);
  }, [toggle])

  return (
    <button type="button" onClick={() => settoggle((prev) => !prev)}>{toggle ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i> }</button>
  )
}