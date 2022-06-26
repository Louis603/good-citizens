import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

function Login({setUser, setNewLike}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    let history = useHistory()

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username: username,
            password
        }
       
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
          if(res.ok){
            res.json()
            .then(user=>{
              setUser(user)
              // setNewLike({})
              history.push('/')
            //   setIsAuthenticated(true)
            })
            
          } else {
            res.json()
            .then(json => setError(json.error))
          }
        })
    }

  return (
    <div>Login
    <form onSubmit={onSubmit}>
        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       
        <input type="submit" value="Login!" />
      </form>
      {error? <div>{error}</div>:null}
      </div>
  )
}

export default Login