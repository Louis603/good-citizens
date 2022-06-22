import React from 'react'
import {NavLink} from 'react-router-dom'

function Header({user}) {
  return (
    <div>
        <ul>
            <NavLink to='/'>Home</NavLink>
        </ul>
        <ul>
            <NavLink to='/new_marker'>Add New</NavLink>
        </ul>
        {user? (
          null
          ):( 
        <ul>
            <NavLink to='/login'>Login</NavLink> /
            <NavLink to='/signup'>Signup</NavLink>
        </ul> 
        )}
    </div>
  )
}

export default Header