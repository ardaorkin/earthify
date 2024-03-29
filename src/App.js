/*
 Copyright (C) 2020  Arda Örkin

 This file is part of Earthify.

 Earthify is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Earthify is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Earthify.  If not, see <https://www.gnu.org/licenses/>.

 ardaorkin3@gmail.com
 https://twitter.com/OrkinArda
 https://github.com/ardaorkin
*/
import React from 'react';
import './css/App.css';
import './css/Responsive.css'
import earthmusic from './icons/earthmusic.png'
import magnifier from './icons/magnifier.png'
import like from './icons/like.png'
import unlike from './icons/unlike.png'
import volume from './icons/volume.png'
import mute from './icons/mute.png'
import play from './icons/play.png'
import pause from './icons/pause.png'
import previous from './icons/previous.png'
import forward from './icons/forward.png'
import { client_secret, client_id, mapbox_access_token, redirect_uri } from './config/config'
import Songs from './components/Songs'

function App(props) {
  const mapStyle = localStorage.getItem("map_style") || "light"
  const access_token = localStorage.getItem('access_token') || ""
  const show_currently_playing = localStorage.getItem('show_currently_playing') || false
  const [accessToken, setToken] = React.useState(access_token)
  const [auth, setAuth] = React.useState(window.localStorage.getItem('auth'))
  const [refresh, setRefresh] = React.useState(localStorage.getItem('refresh_token'))
  const [playlistStore, setPlaylist] = React.useState()
  const [earth, setEarth] = React.useState()
  const [dark, setDark] = React.useState(mapStyle)
  const [searchCountry, setSearch] = React.useState()
  const [openSettings, setSettings] = React.useState(true)
  const [songsComponent, setSongsComponent] = React.useState()
  const [showSongs, setShowSongs] = React.useState(null)
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState({})
  const [showCurrentPlaying, setShowCurrentPlaying] = React.useState(JSON.parse(show_currently_playing))
  const [activeDevice, setActiveDevice] = React.useState({})
  const [isSaved, setSaved] = React.useState(false)

  var artists_array = []
  var scopes = 'user-library-read user-library-modify user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private';
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  mapboxgl.accessToken = mapbox_access_token;

  if (window.location.search.match(/\?code/g) !== null) {

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: `grant_type=authorization_code&code=${window.location.search.split("=")[1]}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`
    })
      .then(res => res.json())
      .then(result => {
        localStorage.setItem('create_access_token_result', JSON.stringify(result))
        localStorage.setItem('access_token', result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
      })
      .then(() => {
        setToken(localStorage.getItem('access_token'))
        setRefresh(localStorage.getItem('refresh_token'))
      })
      .then(() => window.location = window.location.origin + "/earthify")
      .then(() => window.localStorage.setItem('auth', true))
      .catch(err => console.log("acees_token_respone: ", err))
  }


  React.useEffect(() => {

    var layers = []

    setInterval(() => {
      if (localStorage.getItem('logged_in')) {

        /*player division*/
        fetch(`https://api.spotify.com/v1/me/player`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
          .then(res => {
            if (res.status === 204) {
              return res
            } else if (res.status === 200) {
              return res.json()
            }
          })
          .then(result => {
            if (result) {

              if (result.error) {
                if (result.error.status === 401) {
                  fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "Accept": "application/json"
                    },
                    body: `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${client_id}&client_secret=${client_secret}`
                  })
                    .then(res => res.json())
                    .then(result => {
                      console.log("updating access token...")
                      localStorage.setItem('access_token', result.access_token)
                    })
                    .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
                    .then(() => window.location.reload())
                }
              } else {
                if (result.item) {
                  fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${result.item.id}`, {
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
                    }
                  })
                    .then(res => {
                      if (res.status == 200) {
                        return res.json()
                      } else {
                        return res
                      }
                    })
                    .then(result => {
                      setSaved(result[0])
                    })
                }
              }
            }
            setCurrentlyPlaying(result)
            localStorage.setItem('current_position', result.progress_ms)
          })


        /*end of player dision*/

        /*device info*/
        fetch(`https://api.spotify.com/v1/me/player/devices`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        })
          .then(res => {
            if (res.status === 204) {
              return res
            } else if (res.status === 200) {
              return res.json()
            } else if (res.status === 401) {
              fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept": "application/json"
                },
                body: `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${client_id}&client_secret=${client_secret}`
              })
                .then(res => res.json())
                .then(result => {
                  console.log("updating access token...")
                  localStorage.setItem('access_token', result.access_token)
                })
                .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
                .then(() => window.location.reload())
            }
          })
          .then(result => {
            if (result) {
              result.devices.map(device => {
                if (device.is_active == true) {
                  setActiveDevice(device)
                }
              })
            }
          })
        /*end of device info */
      }

    }, 1000)

    var map = new mapboxgl.Map({
      container: 'root',
      style: `mapbox://styles/mapbox/${dark}-v10`,
      zoom: 1.5
    });

    setEarth(map)


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
                  console.log("map_results: ", feature)



                  if ("is source exist", map.getStyle().sources.hasOwnProperty(feature.id) === false) {
                    map.addSource(feature.id, {
                      "type": "geojson",
                      "data": {
                        "type": feature.type,
                        "geometry": feature.geometry
                      }
                    })
                  }

                  map.getStyle().layers.map(layer => {
                    layers.push(layer.id)
                  })


                  if (layers.indexOf(feature.text + "-layer") === -1) {
                    map.addLayer({
                      "id": feature.text + "-layer",
                      "source": feature.id,
                      "type": "circle",
                    })
                  }

                  map.setPaintProperty(feature.text + "-layer", 'circle-color', 'hsl(138, 100%, 40%)');



                  map.getStyle().layers.map(layer => {
                    if (layer.type === "circle" && layer.id !== feature.text + "-layer") {
                      map.setLayoutProperty(layer.id, "visibility", "none")
                    } else if (layer.type === "circle" && layer.id == feature.text + "-layer") {
                      map.setLayoutProperty(layer.id, "visibility", "visible")
                    }
                  })



                  console.log("current_map_style: ", map.getStyle())

                  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${feature.text} top 50`)}&type=playlist`, {

                    method: "GET",
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                    }
                  })
                    .then(res => res.json())
                    .then(result => {
                      if (result.error && result.error.status === 401) {
                        refreshToken()
                      }
                      console.log("search_results: ", result)


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

                      if (Object.keys(playlist).length > 0) {

                        setPlaylist(playlists)

                        localStorage.setItem("countrys_top_fifths", JSON.stringify(playlists))

                        console.log("top_fifth_playlists: ", playlist)

                        fetch("https://api.spotify.com/v1/me/player/devices", {
                          method: "GET",
                          headers: {
                            'Authorization': 'Bearer ' + accessToken
                          }
                        })
                          .then(res => res.json())
                          .then(result => {
                            if (result.error && result.error.status === 401) {
                              refreshToken()
                            }
                            console.log("all_devices_result: ", result)
                            if (result.devices.length === 0) {
                              alert('Please open Spotify App in your device')
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
                                  if (result.error && result.error.status === 401) {
                                    refreshToken()
                                  }
                                  console.log("player_result: ", result)
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
                                  if (result.error && result.error.status === 401) {
                                    refreshToken()
                                  }
                                  else if (result.error && result.error.status === 404) {
                                    alert('Please open Spotify App in your device')
                                  }
                                  console.log("activate_device_result: ", result)
                                })
                            }
                          })
                          .catch(err => console.log("device_err: ", err))
                      } else if (Object.keys(playlist).length === 0) {
                        console.log("there is no top 50 playlist for this country")
                        if (window.confirm(`There isn't any Top 50 playlist for ${feature.text}.\nDo you wanna create one?`)) {
                          let isPublic
                          if (window.confirm("Do you wanna make it public?")) {
                            isPublic = true
                          } else {
                            isPublic = false
                          }
                          fetch("https://api.spotify.com/v1/me", {
                            method: "GET",
                            headers: {
                              "Authorization": "Bearer " + accessToken
                            }
                          })
                            .then(res => res.json())
                            .then(result => {
                              console.log("current_user_info: ", result)
                              fetch(`https://api.spotify.com/v1/users/${result.id}/playlists`, {
                                method: "POST",
                                headers: {
                                  'Authorization': 'Bearer ' + accessToken,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: `${feature.text} Top 50`, public: isPublic, description: "Created via Earthify" })
                              })
                                .then(res => res.json())
                                .then(result => {
                                  console.log("create_playlist_result: ", result)
                                  alert(`Congratulaitons! You've just created a playlist named ${feature.text} Top 50!\nThe Spotify URI of your playtlist is ${result.uri}\nLet's add some tracks.\nMay the followers be with you! ;)`)
                                })
                            })
                        }
                      }
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
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            },
            body: `grant_type=refresh_token&refresh_token=${refresh}&client_id=${client_id}&client_secret=${client_secret}`
          })
            .then(res => res.json())
            .then(result => {
              console.log("updating access token...")
              localStorage.setItem('access_token', result.access_token)
            })
            .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
            .then(() => window.location.reload())
        }

        requestToSpotify()
      }
    })


  }, [])

  var handleStyleMap = () => {
    var currentMapStyle = earth.getStyle()
    if (currentMapStyle.name === "Mapbox Light") {
      earth.setStyle("mapbox://styles/mapbox/dark-v10")
      localStorage.setItem("map_style", "dark")
      setDark(localStorage.getItem("map_style"))
    } else if (currentMapStyle.name === "Mapbox Dark") {
      earth.setStyle("mapbox://styles/mapbox/light-v10")
      localStorage.setItem("map_style", "light")
      setDark(localStorage.getItem("map_style"))
    }
  }

  var handleChangePlaylist = (playlist) => {

    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({ context_uri: playlist.uri })
    })
      .then(res => res)
      .then(result => {
        console.log("pick_playlist_from_the_list: ", result)
        if (result.status === 401) {
          fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            },
            body: `grant_type=refresh_token&refresh_token=${refresh}&client_id=${client_id}&client_secret=${client_secret}`
          })
            .then(res => res.json())
            .then(result => {
              console.log("updating access token...")
              localStorage.setItem('access_token', result.access_token)
            })
            .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
            .then(() => window.location.reload())
        } else if (result.status === 404) {
          alert('Please open Spotify App in your device')
        }
      })
  }


  var handleSearchText = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  var handleSearchCountry = (e) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(e)}.json?&access_token=${mapboxgl.accessToken}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log("searched_country_result: ", result)
        earth.setCenter(result.features[0].geometry.coordinates)
        earth.setZoom(5)
      })
  }

  var handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchCountry(searchCountry)
    }
  }

  var toggleSettings = (e) => {
    setSettings(!openSettings)
  }


  var handleSongs = (e) => {
    localStorage.setItem('listed_playlist', JSON.stringify(e))
    console.log('listed_playlist: ', e)
    if (showSongs === e.id) {
      setShowSongs(null)
    } else {
      var songsComponent = <><Songs playlist_id={e.id} /></>
      setSongsComponent(songsComponent)
      setShowSongs(e.id)
    }
  }

  var togglePausePlay = (e) => {
    if (Object.keys(currentlyPlaying).length > 0) {
      if (currentlyPlaying.is_playing === true) {

        fetch('https://api.spotify.com/v1/me/player/pause', {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        })
          .then(res => res)
          .then(result => console.log("paused_result: ", result))
      } else if (currentlyPlaying.is_playing === false) {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ context_uri: currentlyPlaying.context.uri, offset: { uri: currentlyPlaying.item.uri }, position_ms: localStorage.getItem('current_position') || 0 })
        })
          .then(res => res)
          .then(result => {
            console.log("song_playing: ", result)
            if (result.status === 404) {
              alert('Please open Spotify App in your device')
            }
          })
      }
    }
  }

  var toggleShowCurrentPlaying = (e) => {
    setShowCurrentPlaying(!showCurrentPlaying)
    localStorage.setItem('show_currently_playing', !showCurrentPlaying)
  }

  var handleVolume = (e) => {
    e.preventDefault()
    console.log("volume_value: ", e.target.value)
    fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => {
        if (res.status === 204) {
          return res
        } else {
          return res.json()
        }
      })
      .then(result => {
        console.log("volume_result: ", result)
      })
  }


  var handleSeekPosition = (e) => {
    e.preventDefault()
    if (Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null) {
      var position = parseInt((e.target.value * currentlyPlaying.item.duration_ms) / 100)
      localStorage.setItem('current_position', position)
      console.log(e.target.value)
      fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
      })
        .then(res => res)
        .then(result => { console.log("seek_position_result: ", result) })
    }
  }

  var msToTime = (duration) => {
    var seconds = parseInt((duration / 1000) % 60)
    var minutes = parseInt((duration / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }


  var handlePrevious = () => {
    fetch('https://api.spotify.com/v1/me/player/previous', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res)
      .then(result => console.log("play_previous_result", result))
  }

  var handleForward = () => {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res)
      .then(result => console.log("play_forward_result", result))
  }

  var toggleLike = () => {
    if (Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== undefined) {
      if (isSaved == true) {
        fetch(`https://api.spotify.com/v1/me/tracks?ids=${currentlyPlaying.item.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json"
          }
        })
          .then(res => res)
          .then(result => console.log("unlike_track_result: ", result))
      } else if (isSaved == false) {
        fetch(`https://api.spotify.com/v1/me/tracks?ids=${currentlyPlaying.item.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json"
          }
        })
          .then(res => res)
          .then(result => console.log("like_track_result: ", result))
      }
    }
  }


  return (
    <>
      <div className="settings" style={{ textAlign: openSettings ? "end" : "initial" }}>
        <div className="settings-content" style={{ display: openSettings ? "block" : "none" }}>
          <div className="modes">
            <div className="search-form">
              <input name="search-input" type="text" className="search-input" value={searchCountry || ""} onKeyDown={handleKeyDown} onChange={handleSearchText}></input>
              <div className="search-button"><input type="image" src={magnifier} alt="search" className="icon" onClick={() => handleSearchCountry(searchCountry)}></input></div>
            </div>
            <div>
              <button className="map-style-button" onClick={() => handleStyleMap()}>{dark === "light" ? "Dark Mode" : "Light Mode"}</button>
              <button className="toggle-player-button" onClick={() => toggleShowCurrentPlaying()}>{showCurrentPlaying === true ? "Hide Controls" : "Show Controls"}</button>
            </div>
          </div>
          <div className="lists">
            <ul>
              {playlistStore !== undefined ?
                playlistStore.map(playlist => {
                  return (
                    <>
                      <li key={playlist.id} className="playlist-list">
                        <div
                          className="li-text"
                          onClick={() => handleChangePlaylist(playlist)}>
                          {playlist.name}
                        </div>
                        <button
                          className="songs-button"
                          onClick={() => handleSongs(playlist)}>{showSongs === playlist.id ? "▼" : "►"}</button>
                      </li>
                      {showSongs === playlist.id ? songsComponent : null}
                    </>
                  )
                }) : localStorage.getItem("countrys_top_fifths") ? JSON.parse(localStorage.getItem("countrys_top_fifths")).map(playlist => {
                  return (
                    <>
                      <li key={playlist.id} className="playlist-list">
                        <div
                          className="li-text"
                          onClick={() => handleChangePlaylist(playlist)}>
                          {playlist.name}
                        </div>
                        <button
                          className="songs-button"
                          onClick={() => handleSongs(playlist)}>{showSongs === playlist.id ? "▼" : "►"}</button>
                      </li>
                      {showSongs === playlist.id ? songsComponent : null}
                    </>
                  )
                }) : null
              }
            </ul>

          </div>
        </div>
        <button className="toggle-settings" onClick={toggleSettings}></button>
      </div>
      <div id="map" className="App">
      </div>
      {showCurrentPlaying === true ?
        <div className="now-playing">
          <img className="now-playing-image" src={Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item ? currentlyPlaying.item.album.images[currentlyPlaying.item.album.images.length - 1].url : earthmusic} alt="album-image"></img>

          <img className="now-playing-like" onClick={() => toggleLike()} src={isSaved == true ? unlike : like} alt="is-liked"></img>
          <div className="now-playing-info">
            <p className="now-playing-track-name">{Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null ? currentlyPlaying.item.name : null}</p>
            <p className="now-playing-artist-name">{Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null ? currentlyPlaying.item.artists.map(el => {

              artists_array.push(el.name)
              return artists_array.join(", ")
            }) : null}</p>
          </div>
          <div className="now-playing-duration">{Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null ? msToTime(currentlyPlaying.progress_ms) : "0:00"}</div>
          <div className="now-playing-progress"
          >
            <input
              className="now-playing-slider"
              style={{ background: Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null ? `linear-gradient(90deg, rgb(0,128,128) ${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms * 100) + "%"}, rgb(255,255,255) ${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms * 100) + "%"})` : "white", width: "90%" }}
              type="range"
              min="0" max="100"
              step="0.01"
              value={Object.keys(currentlyPlaying).length > 0 && currentlyPlaying.item !== null ? (currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms * 100) : "0"}
              onChange={(e) => handleSeekPosition(e)}
            >
            </input>
          </div>
          <div className="now-playing-volume">
            <img className="volume-icon" src={volume}></img>
            <input
              id="volume"
              className="now-playing-slider"
              style={{ background: Object.keys(activeDevice).length > 0 && activeDevice.volume_percent !== null ? `linear-gradient(90deg, rgb(0,128,128) ${activeDevice.volume_percent}%, rgb(255,255,255) ${activeDevice.volume_percent}%)` : "white", width: "70%" }}
              type="range"
              min="0" max="100"
              value={activeDevice.volume_percent || "0"}
              onChange={(e) => handleVolume(e)}></input>
          </div>
          <div className="now-playing-turn">
            <button className="now-playing-turn-prev" onClick={() => handlePrevious()}><img src={previous} alt="previous"></img></button>
            <button className="now-playing-turn-play" onClick={() => togglePausePlay()}>{currentlyPlaying.is_playing == true ? <img src={pause} alt="pause"></img> : <img src={play} alt="play"></img>}</button>
            <button className="now-playing-turn-forw" onClick={() => handleForward()}><img src={forward} alt="forward"></img></button>
          </div>
        </div>
        : null}
    </>
  );
}

export default App;