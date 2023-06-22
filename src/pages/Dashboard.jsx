import React, { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, [])
  return (
    <div>Dashboard</div>
  )
}
