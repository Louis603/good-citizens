import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { Route, Router} from "react-router";
import NewMarker from "./NewMarker";
import Comments from "./Comments";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from 'react-router-dom'
import Footer from "./Footer";

function App() {
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [viewport, setViewport] = useState({
    latitude: 40.71096469984769,
    longitude: -73.96734916991853,
    // width: "20vw",
    // height: "20vh",
    zoom: 12
  });


  // console.log(lat)
  const [mapData, setMapData] = useState([])
  const [selectedMark, setSelectedMark] = useState(null)
  const [id, setId] = useState()
  const [user, setUser] = useState(null)
  const [newLike, setNewLike] = useState({})


  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => {
          setUser(user)
          // console.log("user check fetch")
        });
      }});
  }, [newLike]);

  useEffect(() => {
    fetch("/markers")
    .then(resp => resp.json())
    .then((data) => setMapData(data))
  }, [])

  function newMarker(data){
    setMapData([...mapData, data])
  }

  function markerButton(e, marks){
    e.preventDefault()
    setId(marks.id)
    // setSelectedMark(marks.id)          
    fetch(`/markers/${marks.id}`)
      .then(resp => resp.json())
      .then((data) => setSelectedMark(data))
      // console.log(selectedMark)
  }
  
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setUser(null));
  }

  function handleDelete(){
    fetch(`/markers/${id}`, {
      method: "DELETE" })
      // .then((res) => res.json())
      .then(data => {//{console.log(data)
        if(data.ok){
          // console.log(data)
          setSelectedMark(null)
          deleteId(id)
        }else {
          console.log("no")
        }
      })
  }

  function deleteId(deletedId){
    const updatedMap = mapData.filter(map => map.id !== deletedId)
    setMapData(updatedMap)
  }

  function handleLike(e, markId){
    const addLike = {
      user_id: user.id,
      marker_id: markId
    }
    fetch("/likes",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addLike)
    }).then(res => res.json())
      .then(data => setNewLike(data))
  }

  return (
    // style={{display: "flex"}}
    <div style={{backgroundColor: "#F7F5E6", fontFamily: "Roboto"}}>
      <div>
      <Header user={user} handleLogout={handleLogout}/>
      {user?<h1 style={{marginLeft: "5px"}}> Hello {user.username}</h1>:<h1 style={{marginLeft: "5px"}}> Welcome</h1>}
      </div>
      <div style={{ display:"flex", marginLeft: "10px"}}>
        <div style={{width: "600px"}}>
      <Route exact path="/"> 
        <Home user={user} setNewLike={setNewLike}/> 
      </Route>
      <Route path="/new_marker"> 
        <NewMarker lng={lng} lat={lat} newMarker={newMarker} user={user}/> 
      </Route>
      <Route path="/markers/:id/comments">
        <Comments user={user}/>
      </Route>
      <Route path="/signup">
        <Signup setUser={setUser} />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} setNewLike={setNewLike}/>
      </Route>
      </div>
      <div >
      <ReactMapGL 
      onClick={(e) => {
        setLng(e.lngLat.lng)
        setLat(e.lngLat.lat)}}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        // mapStyle="mapbox://styles/louisy603/cl4ihohvl007w14pf67sjqul1"
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/louisy603/cl4qhtyr9000l14mrcv0yzrjb"
        style={{width: 1300, height: 700}}
        onMove={evt => setViewport(evt.viewState)}
        >
          {mapData.map(marks =>(
            <Marker 
            key={marks.id}
            longitude={marks.longitude} latitude={marks.latitude}
            >
            <button className="pin" onClick={e => markerButton(e, marks)}>
              {/* <img  src="./pin.png" /> */}
              <img  src="./map-marker-icon.png" />
            </button>
          </Marker>
          ))}
          
          {selectedMark ? (
          <Popup
            // latitude={40.715553207343646}
            // longitude={-73.99283450881435}
            latitude={selectedMark.latitude}
            longitude={selectedMark.longitude}
            onClose={() => setSelectedMark(null)}>
            
            <div style={{width: "auto", height: "auto"}}>
              <h2>{selectedMark.name}</h2>
              <p>{selectedMark.description}</p>
              <Link to={`/markers/${id}/comments`}>
                <button>See More</button>
              </Link>

              {user?(
                <button onClick={handleDelete}>Delete</button>
              ): null }
              
              {user?(
                <button onClick={(e)=>handleLike(e,selectedMark.id)}>Like</button>
              ): null }

              <img style={{height: "150px", width: "auto", marginTop:"5px"}} src={selectedMark.image}></img>
            </div>
          </Popup>
          ): null}
      </ReactMapGL>
      
      </div>
      
      </div>
      <Footer />
    </div>
  );
}

export default App;
