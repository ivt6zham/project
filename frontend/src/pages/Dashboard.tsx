import React, { useEffect, useState } from 'react'
import { API_URL } from '../api'

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/health_check`)
        if (res.ok) {
          const body = await res.json()
          setStatus(body.status || 'ok')
        } else {
          setStatus('error')
        }
      } catch (err) {
        setStatus('network error')
      }
    })()
  }, [])

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>API status: {status}</div>
    </div>
  )
}

export default Dashboard
