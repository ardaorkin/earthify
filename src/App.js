import React from 'react';
import './App.css';

function App(props) {
  const access_token = localStorage.getItem('access_token') || ""
  const [accessToken, setToken] = React.useState(access_token)
  const [auth, setAuth] = React.useState(window.localStorage.getItem('auth'))
  const [refresh, setRefresh] = React.useState(localStorage.getItem('refresh_token'))
  const [light, setLight] = React.useState(true)


  let mapStyle
  if (light === true) {
    mapStyle = "light"
  } else if (light === false) {
    mapStyle = "dark"
  }

  var client_id = '9e71a4da3ee24d31ab4fd842607cce9e';
  var redirect_uri
  if (window.location.origin !== "http://localhost:3000") {
    redirect_uri = window.location.origin + window.location.pathname
  } else {
    redirect_uri = window.location.origin + "/callback"
  }
  var scopes = 'user-modify-playback-state user-read-playback-state';


  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkYW9ya2luIiwiYSI6ImNrOW9teW8wMzAyNnczbHJ0emVvNHE5dXcifQ.J_P9VwfH6UeYpgG5gw-JJQ';

  if (window.location.search.match(/\?code/g) !== null) {
    async function afterAuthorize() {
      await window.localStorage.setItem('auth', true)
      await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": "Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6ZjJhZjc4MjVhOTA1NGNiNWE5MmMwZDZlMWEwNDAwNTY=",
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: `grant_type=authorization_code&code=${window.location.search.split("=")[1]}&redirect_uri=${redirect_uri}`
      })
        .then(res => res.json())
        .then(result => {
          localStorage.setItem('access_token', result.access_token)
          localStorage.setItem('refresh_token', result.refresh_token)
        })
        .then(() => {
          setToken(localStorage.getItem('access_token'))
          setRefresh(localStorage.getItem('refresh_token'))
        })
        .then(() => window.location = window.location.origin + "/earthify")
        .catch(err => console.log("acees_token_respone: ", err))
    }
    afterAuthorize()
  }


  React.useEffect(() => {


    var map = new mapboxgl.Map({
      container: 'root',
      style: "mapbox://styles/mapbox/light-v10",
      zoom: 3
    });

    map.on('click', (e) => {
      if (!window.location.search.match(/\?code/g) && !auth) {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`
      }
      else {
        console.log("acces_token: ", accessToken)


        function requestToSpotify() {

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
                  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${feature.text} top 50`)}&type=playlist`, {
                    method: "GET",
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                    }
                  })
                    .then(res => res.json())
                    .then(result => {
                      console.log("search_results: ", result)
                      if (result.error && result.error.status === 401) {
                        refreshToken()
                      }

                      var playlists = []
                      var playlist = []
                      result.playlists.items.map(item => {
                        if (item.owner.display_name === "Top 50 Playlists") {
                          playlists.push(item)
                        } else if (item.owner.display_name === "spotifycharts") {
                          playlists.push(item)
                        } else if (item.name.match(/top\ 50/gi)) {
                          playlists.push(item)
                        }
                      })

                      if (playlists.length > 1) {
                        playlist = playlists[0]
                      } else {
                        playlist = playlists
                      }

                      console.log("top_fifth_playlists: ", playlist)
                      fetch("https://api.spotify.com/v1/me/player/devices", {
                        method: "GET",
                        headers: {
                          'Authorization': 'Bearer ' + accessToken
                        }
                      })
                        .then(res => res.json())
                        .then(result => {
                          console.log("all_devices_result: ", result)
                          if (result.error && result.error.status === 401) {
                            refreshToken()
                          }
                          if (result.devices.length === 0) {
                            alert('Please run Spotify App in your device.')
                          }
                          var deviceArr = []
                          result.devices.map(device => {
                            if (device.is_active === true) {
                              deviceArr.push(device.id)
                            }
                            return deviceArr
                          })
                          console.log("active_devices_array: ", deviceArr)
                          if (deviceArr.length > 0) {
                            console.log("active device found!")
                            fetch("https://api.spotify.com/v1/me/player/play?", {
                              method: "PUT",
                              headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                              },
                              body: JSON.stringify({ context_uri: playlist.uri })
                            })
                              .then((response) => response.json())
                              .then(result => {
                                console.log("player_result: ", result)
                                if (result.error && result.error.status === 401) {
                                  refreshToken()
                                }
                              })
                              .catch(err => console.log("player_err: ", err))
                          } else if (deviceArr.length === 0) {
                            console.log("there is no active device. first found device is activating...")
                            fetch("https://api.spotify.com/v1/me/player", {
                              method: "PUT",
                              headers: {
                                'Authorization': 'Bearer ' + accessToken,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              },
                              body: JSON.stringify({ device_ids: [deviceArr[0]], "play": true })
                            })
                              .then(res => res.json())
                              .then(result => {
                                console.log("activate_device_result: ", result)
                                if (result.error && result.error.status === 401) {
                                  refreshToken()
                                }
                              })
                          }
                        })
                        .catch(err => console.log("device_err: ", err))

                      return playlist
                    })
                    .catch(err => console.log("search_err: ", err))
                }
                return feature
              })
            })
            .catch((err) => {
              console.log("map_err: ", err)
            })
        }
        function refreshToken() {
          console.log("access token is refreshing...")
          fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Authorization": "Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6ZjJhZjc4MjVhOTA1NGNiNWE5MmMwZDZlMWEwNDAwNTY=",
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            },
            body: `grant_type=refresh_token&refresh_token=${refresh}`
          })
            .then(res => res.json())
            .then(result => {
              console.log("updating access token...")
              localStorage.setItem('access_token', result.access_token)
            })
            .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
            .then(() => requestToSpotify())
        }

        requestToSpotify()
      }
    })

  }, [])



  var handleMapColor = (e) => {
    e.preventDefault()
    setLight(!light)
    console.log(light)
    console.log(mapStyle)
  }

  return (
    <>
      <div id="map" className="App">

      </div>
    </>
  );
}

export default App;
