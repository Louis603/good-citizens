import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
      <Map
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -73.9867,
        latitude: 40.7268,
        zoom: 12
      }}
      
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
      </div>
    </BrowserRouter>
  );
}

export default App;
