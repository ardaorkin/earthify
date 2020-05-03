import React from 'react';
import './App.css';

function App() {
  const [accessToken, setToken] = React.useState(localStorage.getItem('access_token'))
  const isAuth = window.localStorage.getItem('auth') || false
  const [auth, setAuth] = React.useState(isAuth)
  var baseURI = "https://api.spotify.com/"
  var client_id = '9e71a4da3ee24d31ab4fd842607cce9e';
  var redirect_uri = window.location.origin + window.location.pathname
  var scopes = 'user-modify-playback-state user-read-playback-state';


  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ';

  if (window.location.hash.match(/access_token/g) !== null) {
    async function afterAuthorize() {
      await window.localStorage.setItem('auth', true)
      var hash = window.location.hash.substr(1);
      localStorage.setItem('access_token', hash.split('=')[1].split('&')[0])
      window.location = window.location.origin
    }
    afterAuthorize()
  }


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
                  fetch("https://api.spotify.com/v1/me/player/devices", {
                    method: "GET",
                    headers: {
                      'Authorization': 'Bearer ' + accessToken
                    }
                  })
                    .then(res => res.json())
                    .then(result => {
                      console.log(result.devices[0].id)
                      fetch("https://api.spotify.com/v1/me/player/play" + "?device_id=" + result.devices[0].id, {
                        method: "PUT",
                        headers: {
                          'Authorization': `Bearer ${accessToken}`,
                          "Content-Type": "application/json",
                          "Accept": "application/json",
                        },
                        body: JSON.stringify({"uris": ["spotify:track:6Mer1LOfJDd7vUbeWXODrq"]})
                      })
                        .then((response) => response.json())
                        .then(data => console.log("player_result: ", data))
                        .catch(err => console.log("player_err: ", err))
                    }
                    )
                    .catch(err => console.log("device_err: ", err))
                }
              }
            })
          })
          .catch((err) => {
            console.log("map_err: ", err)
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
