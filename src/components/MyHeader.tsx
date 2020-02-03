import React from 'react'
import { NavLink } from 'react-router-dom'

const MyHeader = () => {
  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await fetch('/logout', { method: 'POST' })
    window.location.href = '/login'
  }
  return (
    <div>
      <NavLink exact activeStyle={{ color: 'green' }} to='/'>
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
