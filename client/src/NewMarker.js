import React from 'react'
import { useState, useEffect } from "react";

let forms = {
    display: "block",
    marginTop: "4px"
}

let input = {
    float: "left",
    // paddingTop: "5px"
}


function NewMarker({lng, lat, newMarker, user}) {
    // console.log(user.id)
    // const [longitude, setLongitude] = useState()
    const [handleError, setHandleError] = useState()
    const [form, setForm] = useState ({
        name: "",
        description: "",
        image: "",
        longitude: "",
        latitude: "",
        // user_id: user.id
    })

    useEffect(() => {
        setForm({latitude: lat, longitude:lng})
    },[lng, lat])

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
        }).then(res => res.json())
        //   .then(data => newMarker(data))
          .then(data => { //console.log(data.error)
            if(data.error){
                setHandleError(data.error)
            } else {
                newMarker(data)
                setHandleError()
                setForm({
                    name: "",
                    description: "",
                    image: "",
                    longitude: "",
                    latitude: ""
                })
            }
          })
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
        // console.log(form)
    }



  return (
    <div>
        {user ? <h3>Create a new marker</h3> :<h3>Sign in to add a moment</h3>}
        <h4>{handleError}</h4>

    <p>To add a new marker click on the map to update Longitude/Latitude and then fill out the rest</p>
        
    <form onSubmit={(e) => handleSubmit(e)} >
        <fieldset style={{border: "0"}}>
            <label style={forms}>Title<input style={input} type="text" name="name" value={form.name} onChange={handleChange}/></label>
            <label style={forms}>Description<input style={input} type="text" name="description" value={form.description} onChange={handleChange}/></label>
            <label style={forms}>Image<input style={input} type="text" name="image" value={form.image} onChange={handleChange}/></label>
            <label style={forms}>Longitude<input style={input} type="text" name="longitude" value={form.longitude} onChange={handleChange}/></label>
            <label style={forms}>Latitude<input style={input} type="text" name="latitude" value={form.latitude} onChange={handleChange}/></label>
            <button type="submit" >Submit</button>
        </fieldset>
    </form>
    </div>
  )
}

export default NewMarker