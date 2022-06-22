import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function Comments({comments}) {
    const [data, setData] = useState({
        comments:[{}]
    })

    const { id } = useParams()
    // const [data, setData] = useState({
    //     "name": "test2",
    //     "description": "test2",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/One-man_band_street_performer_-_5.jpg/1200px-One-man_band_street_performer_-_5.jpg",
    //     "longitude": "-74.00175164473272",
    //     "latitude": "40.73940602313252",
    //     "user_id": 12,
    //     "comments": [
    //         {
    //             "id": 4,
    //             "comment": "testing2 testing2",
    //             "user_id": 12,
    //             "marker_id": 8
    //         }
    //     ]
    // })


    useEffect(() => {
        fetch(`/markers/${id}`)
        .then(resp => resp.json())
        .then((data) => setData(data))
    },[id])

    // console.log(data)

    const mapData = data.comments.map(com => {
       return (
        <p>{com.user_id}: {com.comment}</p>
       )
    })
    
  return (
    <div>
        <h1>All Comments</h1>
        {mapData}
    </div>
  )
}

export default Comments