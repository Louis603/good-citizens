import React from 'react'
import { Link } from 'react-router-dom'

function Home({user, setNewLike}) {
  console.log(user)

  function handleDelete(like){
    setNewLike(like)
    fetch(`/likes/${like.id}`, {
      method: "DELETE",
    }).then(() => console.log("deleted"));
  }
  
  return (
    <div style={{display: "grid", width: "590px", height: "700px",
    gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", overflowY: "auto"
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
              <button onClick={() =>handleDelete(like)}>Unlike</button>
            </div>
          )
        })
      )
       : (
        <div style={{width: "500px"}}>
          <p>Welcome to Good Citizens where you can stop looking at the negatives of a city and focus on the positive!</p>
          <p>Place markers on the map and show other users cool things you see or even free stuff!</p>
          <p>Keep it friendly and respectful in the comments</p>
        </div>
       ) }
    </div>
  )
}

export default Home