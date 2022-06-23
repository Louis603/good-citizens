import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function Comments({user}) {
    const [data, setData] = useState({
        comments:[{}]
    })
    const [addComment, setAddComment] = useState()
    const [newComment, setNewComment] =useState({})

    const { id } = useParams()

    useEffect(() => {
        fetch(`/markers/${id}`)
        .then(resp => resp.json())
        .then((data) => setData(data))
    },[id,newComment])

    function handleChange(e){
      setAddComment(e.target.value)
    }

    function handleSubmit(e){
      e.preventDefault()
      const form = {
        comment: addComment,
        user_id: user.id,
        marker_id: id
      }
      fetch("/comments",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
      }).then(resp => resp.json())
        .then(data => {
          if(data.error){
            console.log("data")
          }else{
          setNewComment(data)
          }
        })
    }
 


    // console.log(data)

    const mapData = data.comments.map(com => {
       return (
        <p><b>{com.name}</b>: {com.comment}</p>
       )
    })
    
  return (
    <div>
      <img src={data.image} style={{height:"400px", marginLeft: "20%"}}></img>
      <p>{data.description}</p>
        <h1>All Comments</h1>
        {mapData}
        {user ? <h3>Add Comment</h3>:<h3>Sign in to add comment</h3>}
        
        <form onSubmit={handleSubmit}>
          <label>
            <textarea rows="4" cols="50"
            name="comment"
            value={addComment}
            onChange={handleChange}
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Comments