import React from 'react'
import { useState, useEffect } from "react";

function Signup({setUser}) {
  const [form, setForm] = useState({
    username:"",
    password:""
  })

  function handleChange(e){
    setForm({...form, [e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch("/users",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
  }).then(resp => resp.json())
    .then(data => setUser(data))

  }

  return (
    <div>Signup
      <form onSubmit={handleSubmit}>
        <label>Username
          <input type="text" name="username" onChange={handleChange}/>
        </label>
        <label>Password
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default Signup