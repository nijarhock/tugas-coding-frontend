import React from 'react'

export default function SelectValidation({
  label,
  name,
  onChange,
  error,
  value,
  data
}) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select 
        name={name}
        id={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={onChange}
        value={value}
      >
        <option disabled={true} value="">-- Choose {label} --</option>
        {data.map((d, index) => {
          return (
            <option key={index} value={d.id}>{d.nama}</option>
          )
        })}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}
