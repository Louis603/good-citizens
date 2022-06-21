import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 40.715553207343646,
    longitude: -73.99283450881435,
    // width: "20vw",
    // height: "20vh",
    zoom: 8
  });

  const [mapData, setMapData] = useState([])
  const [selectedMark, setSelectedMark] = useState(null)

  useEffect(() => {
    fetch("/markers")
    .then(resp => resp.json())
    .then((data) => setMapData(data))
  }, [])


  return (
    <div>
      <ReactMapGL 
      // onClick={e => {console.log(e)}}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        // mapStyle="mapbox://styles/louisy603/cl4ihohvl007w14pf67sjqul1"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width: 600, height: 400}}
        onMove={evt => setViewport(evt.viewState)}
        >
          {mapData.map(marks =>(
            <Marker 
            // longitude={-73.99283450881435} latitude={40.715553207343646} anchor="bottom" 
            longitude={marks.coordinates[0]} latitude={marks.coordinates[1]}
            >
            <button className="pin"
              onClick={e => {
                e.preventDefault()
                console.log(marks)
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
            latitude={selectedMark.coordinates[1]}
            longitude={selectedMark.coordinates[0]}
            onClose={() => {
              setSelectedMark(null);
            }}
          >
            <div>
              <h2>{selectedMark.name}</h2>
              <p>{selectedMark.description}</p>
            </div>
          </Popup>
          // console.log(selectedMark)
          ): null}
      </ReactMapGL>
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
