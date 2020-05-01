import React from 'react';
import './App.css';


function App() {
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ';

  React.useEffect(() => {
    var map = new mapboxgl.Map({
      container: 'root',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 3
    });


    map.on('click', (e) => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng.toString()},${e.lngLat.lat.toString()}.json?&access_token=${mapboxgl.accessToken}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(res => 
        res.json()
      )
      .then(result => {
        result.features.map(feature => {
          if(feature.place_type[0] === "country") {
            console.log(feature.place_name)
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }, [])
  return (
    <div id="map" className="App">
      
    </div>
  );
}

export default App;
