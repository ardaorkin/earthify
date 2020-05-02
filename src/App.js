import React from 'react';
import './App.css';

function App() {
  const isAuth = window.localStorage.getItem('auth') || false
  const [auth, setAuth] = React.useState(isAuth)
  var baseURI = "https://api.spotify.com/"
  var client_id = '9e71a4da3ee24d31ab4fd842607cce9e';
  var redirect_uri = window.location.origin + "/callback"
  var scopes = 'user-read-private user-read-email';


  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ';

  React.useEffect(() => {
    var map = new mapboxgl.Map({
      container: 'root',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 3
    });

    map.on('click', (e) => {
      if (!window.location.hash && !auth) {
        window.location = "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=token" + "&redirect_uri=" + encodeURIComponent(redirect_uri) + "&scope=" + encodeURIComponent(scopes) + "&show_dialog=true"
      }
      else {
        window.localStorage.setItem('auth', true)
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng.toString()},${e.lngLat.lat.toString()}.json?&access_token=${mapboxgl.accessToken}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res =>
            res.json()
          )
          .then(result => {
            result.features.map(feature => {
              if (feature.place_type[0] === "country") {
                console.log(feature)
              }
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    if(window.location.hash) {
      var hash = window.location.hash.substr(1); //url of the current page
      var access_token = hash.split('=')[1].split('&')[0]; //this creates an array with key ([0] element) and value ([1] element)
      console.log(access_token)
    }
  }, [])
  return (
    <>
      <div id="map" className="App">

      </div>
    </>
  );
}

export default App;