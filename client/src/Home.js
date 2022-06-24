import React from 'react'

function Home({user}) {
  console.log(user)
  
  return (
    <div style={{display: "flex"}}>
      {user ? ( 
        user.likes.map(like => {
          return (
            <div>
              <img src={like.marker.image} style={{height: "200px"}}></img>
              <p>{like.marker.name}</p>
            </div>
          )
        })
      )
       : null }
    </div>
  )
}

export default Home