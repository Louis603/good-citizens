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

function App() {
  const [lng, setLng] = useState()
  const [lat, setLat] = useState()
  const [viewport, setViewport] = useState({
    latitude: 40.715553207343646,
    longitude: -73.99283450881435,
    // width: "20vw",
    // height: "20vh",
    zoom: 10
  });

  // console.log(lng)
  // console.log(lat)
  const [mapData, setMapData] = useState([])
  const [selectedMark, setSelectedMark] = useState(null)
  const [comments, setComments] = useState(8)
  const [id, setId] = useState()
  const [user, setUser] = useState(null)


  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/markers")
    .then(resp => resp.json())
    .then((data) => setMapData(data))
  }, [])

  function newMarker(data){
    setMapData([...mapData, data])
  }

  function handleCommentClick(e){
    e.preventDefault()
    setComments(selectedMark.id)
  }
  
  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setUser(null));
  }

  return (
    <div>
      <Header user={user}/>
      {user?<><h1>Hello {user.username}</h1>  <button onClick={handleLogout}>Logout</button></>:null}
      <ReactMapGL 
      onClick={(e) => {
        setLng(e.lngLat.lng)
        setLat(e.lngLat.lat)}}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        // mapStyle="mapbox://styles/louisy603/cl4ihohvl007w14pf67sjqul1"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: 600, height: 400}}
        onMove={evt => setViewport(evt.viewState)}
        >
          {mapData.map(marks =>(
            <Marker 
            key={marks.id}
            longitude={marks.longitude} latitude={marks.latitude}
            >
            <button className="pin"
              onClick={e => {
                e.preventDefault()
                setId(marks.id)
                // setSelectedMark(marks.id)
                
                fetch(`/markers/${marks.id}`)
                .then(resp => resp.json())
                .then((data) => setSelectedMark(data))
                console.log(selectedMark)
              }}>
              <img  src="./pin.png" />
            </button>
          </Marker>
          ))}
          
          {selectedMark ? (
          <Popup
            // latitude={40.715553207343646}
            // longitude={-73.99283450881435}
            latitude={selectedMark.latitude}
            longitude={selectedMark.longitude}
            onClose={() => {
              setSelectedMark(null);
            }}
          >
            <div>
              <h2>{selectedMark.name}</h2>
              <p>{selectedMark.description}</p>
              <Link to={`/markers/${id}/comments`}>
              <button 
              // onClick={(e) => handleCommentClick(e)}
              >
                See More
              </button>
              </Link>
              <img style={{height: "200px", width: "140px"}} src={selectedMark.image}></img>
              
            </div>
          </Popup>
          // console.log(selectedMark)
          ): null}
      </ReactMapGL>
      {/* <Router> */}
      <Route exact path="/"> 
        <Home /> </Route>
      <Route path="/new_marker"> 
        <NewMarker lng={lng} lat={lat} newMarker={newMarker}/> 
      </Route>
      <Route path="/markers/:id/comments">
        <Comments user={user}/>
      </Route>
      <Route path="/signup">
        <Signup setUser={setUser} />
      </Route>
      <Route path="/login">
        <Login setUser={setUser}/>
      </Route>
      {/* </Router> */}
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import Map from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// function App() {
//   return (
//     <Map
//       initialViewState={{
//         longitude: -73.99283450881435,
//         latitude: 40.715553207343646,
//         zoom: 10
//       }}
//       style={{width: 600, height: 400}}
//       mapStyle="mapbox://styles/louisy603/cl4ihohvl007w14pf67sjqul1"
//     />
//   );
// }




{/* <Map
          onClick={e => {console.log(e.lngLat)}}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -73.99283450881435,
            latitude: 40.715553207343646,
            zoom: 12
          }}
          style={{width: 600, height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...mapMarkers.map(marker => (
            <Marker
                key={(marker.id)}
                latitude={40.715553207343646}
                longitude={-73.99283450881435}
                latitude={marker.coordinates[1]}
                longitude={marker.coordinates[0]}
                
            >
              <button>
                <img style={{width: "20px", height: "20px"}} src="logo.svg"  />
              </button>
            </Marker>
          ))}
          
        /> */}
export default App;
