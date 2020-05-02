import React from 'react';
import './App.css';

function App() {
  const isAuth = window.localStorage.getItem('auth') || false
  const [auth, setAuth] = React.useState(isAuth)
  var baseURI = "https://api.spotify.com/"
  var client_id = '9e71a4da3ee24d31ab4fd842607cce9e';
  var redirect_uri = window.location.origin + window.location.pathname
  if (window.location.pathname != "/callback") {
    redirect_uri = window.location.origin + "/callback"
  }
  var scopes = 'user-modify-playback-state';


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
        var hash = window.location.hash.substr(1);
        var accessToken = hash.split('=')[1].split('&')[0];
        console.log("acces_token: ", accessToken)
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
                console.log("feature: ", feature.text)
                if (feature.text === "Turkey") {
                  fetch("https://api.spotify.com/v1/me/player/play", {
                    method: "PUT",
                    headers: {
                      'Authorization': 'Bearer ' + accessToken
                    },
                    body: { 
                      "context_uri": "spotify:album:1ez8jhd6P5k8DD0mYnfBtz"
                    }
                  })
                  .then(res => console.log("response: ", res))
                  .catch(err => console.log("err: ", err))
                }
              }
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }, [])
  return (
    <>
      <div id="map" className="App">

      </div>
    </>
  );
}

export default App;