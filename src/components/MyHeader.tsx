import React from 'react'
import { NavLink } from 'react-router-dom'

const MyHeader = () => {
  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/login'
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <NavLink
        exact
        style={{ fontSize: 32 }}
        activeStyle={{ color: 'green' }}
        to='/'
      >
        Simple Manager
      </NavLink>
      |{' '}
      <a onClick={onLogout} href='/login'>
        logout
      </a>
    </div>
  )
}

export default MyHeader
