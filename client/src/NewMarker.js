import React from 'react'
import { useState, useEffect } from "react";


function NewMarker({lng, lat, newMarker}) {
    // const [longitude, setLongitude] = useState()
    const [form, setForm] = useState ({
        name: "",
        description: "",
        image: "",
        longitude: "",
        latitude: "",
    })

    // useEffect(() =>{
    //     setLongitude(lng)
    // },[longitude])
    // console.log(longitude)
    
    
    function handleSubmit(e){
        e.preventDefault()
        fetch("/markers",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(resp => resp.json())
          .then(data => newMarker(data))
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
        console.log(form)
    }



  return (
    <div>
        <h3>Create a new instance</h3>
    <form onSubmit={(e) => handleSubmit(e)} >
        <label>Name<input type="text" name="name" value={form.name} onChange={handleChange}/></label>
        <label>Description<input type="text" name="description" value={form.description} onChange={handleChange}/></label>
        <label>Image<input type="text" name="image" value={form.image} onChange={handleChange}/></label>
        <label>Lng<input type="text" name="longitude" value={lng} onChange={handleChange}/></label>
        <label>Lat<input type="text" name="latitude" value={lat} onChange={handleChange}/></label>
        <button type="submit" >Submit</button>
    </form>
    </div>
  )
}

export default NewMarker