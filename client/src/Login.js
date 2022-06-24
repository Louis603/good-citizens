import React, {useState} from 'react'

function Login({setUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
            //   setIsAuthenticated(true)
            })
            
          } else {
            res.json()
            .then(json => console.log(json.error))
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
      </div>
  )
}

export default Login