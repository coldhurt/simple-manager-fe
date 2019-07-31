import React from 'react'
import { NavLink } from 'react-router-dom'

const MyHeader = () => {
  return (
    <div>
      <NavLink exact activeStyle={{ color: 'green' }} to='/'>
        Simple Manager
      </NavLink>
    </div>
  )
}

export default MyHeader
