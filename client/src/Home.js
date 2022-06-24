import React from 'react'
import { Link } from 'react-router-dom'

function Home({user, setNewLike}) {

  function handleDelete(like){
    setNewLike(like)
    fetch(`/likes/${like.id}`, {
      method: "DELETE",
    }).then(() => console.log("deleted"));
  }
  
  return (
    <div style={{display: "grid", width: "600px", height: "700px",
    gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", overflowY: "auto"
    }}>
      {user ? ( 
        user.likes.map(like => {
          return (
            <div>
              <img src={like.marker.image} style={{height: "200px"}}></img>
              <p>{like.marker.name}</p>
              <Link to={`/markers/${like.marker.id}/comments`}>
                <button>See More</button>
              </Link>
              <button onClick={() =>handleDelete(like)}>Delete</button>
            </div>
          )
        })
      )
       : null }
    </div>
  )
}

export default Home