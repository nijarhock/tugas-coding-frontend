import React from 'react'

export default function Breadcrumb() {
  return (
    <div className="section-header">
      <h1>User</h1>
      <div className="section-header-breadcrumb">
        <div className="breadcrumb-item active"><a href="#">User</a></div>
        <div className="breadcrumb-item">View</div>
      </div>
    </div>
  )
}