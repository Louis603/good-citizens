import React from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
  return (
    <div>
        <ul>
            <NavLink to='/'>Home</NavLink>
        </ul>
        <ul>
            <NavLink to='/new_marker'>Add New</NavLink>
        </ul>
    </div>
  )
}

export default Header