import React from 'react'

export default function Button({ processing, label, classCustom }) {
  return (
    <button type="submit" disabled={processing} className={`${classCustom} ${processing ? 'btn-progress ' : ''}`} tabIndex="4">
      { label }
    </button>
  )
}