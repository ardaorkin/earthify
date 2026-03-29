/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/
// @ts-nocheck
import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './css/App.css'
import './css/Responsive.css'
import earthmusic from './icons/earthmusic.png'
import magnifier from './icons/magnifier.png'
import like from './icons/like.png'
import unlike from './icons/unlike.png'
import volume from './icons/volume.png'
import play from './icons/play.png'
import pause from './icons/pause.png'
import previous from './icons/previous.png'
import forward from './icons/forward.png'
import { client_secret, client_id, mapbox_access_token, redirect_uri } from './config/config'
import Songs from './components/Songs'

mapboxgl.accessToken = mapbox_access_token

function App() {
  const mapStyle = localStorage.getItem('map_style') || 'light'
  const access_token = localStorage.getItem('access_token') || ''
  const show_currently_playing = localStorage.getItem('show_currently_playing') || 'false'

  const [accessToken, setToken] = useState(access_token)
  const [auth] = useState(window.localStorage.getItem('auth'))
  const [refresh] = useState(localStorage.getItem('refresh_token'))
  const [playlistStore, setPlaylist] = useState()
  const [earth, setEarth] = useState()
  const [dark, setDark] = useState(mapStyle)
  const [searchCountry, setSearch] = useState()
  const [openSettings, setSettings] = useState(true)
  const [songsComponent, setSongsComponent] = useState()
  const [showSongs, setShowSongs] = useState(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState({})
  const [showCurrentPlaying, setShowCurrentPlaying] = useState(JSON.parse(show_currently_playing))
  const [activeDevice, setActiveDevice] = useState({})
  const [isSaved, setSaved] = useState(false)

  const scopes = 'user-library-read user-library-modify user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private'

  if (window.location.search.match(/\?code/g) !== null) {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: `grant_type=authorization_code&code=${window.location.search.split('=')[1]}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem('create_access_token_result', JSON.stringify(result))
        localStorage.setItem('access_token', result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
      })
      .then(() => setToken(localStorage.getItem('access_token') || ''))
      .then(() => { window.location.href = window.location.origin + '/earthify' })
      .then(() => window.localStorage.setItem('auth', 'true'))
      .catch((err) => console.log('access_token_response: ', err))
  }

  useEffect(() => {
    const layers = []
    const interval = setInterval(() => {
      if (localStorage.getItem('logged_in')) {
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json', Accept: 'application/json' },
        })
          .then((res) => (res.status === 200 ? res.json() : null))
          .then((result) => {
            if (result) {
              if (result.error?.status === 401) refreshToken()
              else if (result.item) {
                fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${result.item.id}`, {
                  method: 'GET',
                  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
                })
                  .then((res) => (res.status === 200 ? res.json() : null))
                  .then((r) => r && setSaved(r[0]))
              }
              setCurrentlyPlaying(result)
              if (result.progress_ms) localStorage.setItem('current_position', String(result.progress_ms))
            }
          })
        fetch('https://api.spotify.com/v1/me/player/devices', {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        })
          .then((res) => (res.status === 200 ? res.json() : null))
          .then((result) => result?.devices?.forEach((d) => d.is_active && setActiveDevice(d)))
      }
    }, 1000)

    const map = new mapboxgl.Map({ container: 'root', style: `mapbox://styles/mapbox/${dark}-v10`, zoom: 1.5 })
    setEarth(map)

    map.on('click', (e) => {
      if (!window.location.search.match(/\?code/g) && !auth) {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`
      } else {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
          .then((res) => res.json())
          .then((result) => {
            result.features.forEach((feature) => {
              if (feature.place_type[0] === 'country') {
                if (!map.getStyle().sources.hasOwnProperty(feature.id)) {
                  map.addSource(feature.id, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: feature.geometry } })
                }
                map.getStyle().layers.forEach((l) => layers.push(l.id))
                if (layers.indexOf(feature.text + '-layer') === -1) {
                  map.addLayer({ id: feature.text + '-layer', source: feature.id, type: 'circle' })
                }
                map.setPaintProperty(feature.text + '-layer', 'circle-color', 'hsl(138, 100%, 40%)')
                map.getStyle().layers.forEach((l) => {
                  if (l.type === 'circle') map.setLayoutProperty(l.id, 'visibility', l.id === feature.text + '-layer' ? 'visible' : 'none')
                })
                fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${feature.text} top 50`)}&type=playlist`, {
                  method: 'GET',
                  headers: { Authorization: `Bearer ${accessToken}` },
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.error?.status === 401) refreshToken()
                    const playlists = result.playlists.items.filter((i) => i.owner.display_name === 'Top 50 Playlists' || i.owner.display_name === 'spotifycharts' || i.name.match(/top 50/gi))
                    const playlist = playlists[0]
                    if (playlist) {
                      setPlaylist(playlists)
                      localStorage.setItem('countrys_top_fifths', JSON.stringify(playlists))
                      fetch('https://api.spotify.com/v1/me/player/devices', { headers: { Authorization: 'Bearer ' + accessToken } })
                        .then((res) => res.json())
                        .then((r) => {
                          if (r.devices.length === 0) alert('Please open Spotify App in your device')
                          const activeDevices = r.devices.filter((d) => d.is_active).map((d) => d.id)
                          if (activeDevices.length > 0) {
                            fetch('https://api.spotify.com/v1/me/player/play', {
                              method: 'PUT',
                              headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ context_uri: playlist.uri }),
                            })
                          }
                        })
                    } else if (window.confirm(`No Top 50 playlist for ${feature.text}. Create one?`)) {
                      const isPublic = window.confirm('Make it public?')
                      fetch('https://api.spotify.com/v1/me', { headers: { Authorization: 'Bearer ' + accessToken } })
                        .then((res) => res.json())
                        .then((user) => {
                          fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: `${feature.text} Top 50`, public: isPublic, description: 'Created via Earthify' }),
                          })
                            .then((res) => res.json())
                            .then((r) => alert(`Created ${feature.text} Top 50! URI: ${r.uri}`))
                        })
                    }
                  })
              }
            })
          })
      }
    })
    return () => { clearInterval(interval); map.remove() }
  }, [])

  function refreshToken() {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: `grant_type=refresh_token&refresh_token=${refresh}&client_id=${client_id}&client_secret=${client_secret}`,
    })
      .then((res) => res.json())
      .then((r) => localStorage.setItem('access_token', r.access_token))
      .then(() => window.location.reload())
  }

  const handleStyleMap = () => {
    if (!earth) return
    const style = earth.getStyle().name === 'Mapbox Light' ? 'dark' : 'light'
    earth.setStyle(`mapbox://styles/mapbox/${style}-v10`)
    localStorage.setItem('map_style', style)
    setDark(style)
  }

  const handleChangePlaylist = (playlist) => {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      body: JSON.stringify({ context_uri: playlist.uri }),
    }).then((r) => { if (r.status === 401) refreshToken(); if (r.status === 404) alert('Please open Spotify App') })
  }

  const handleSearchCountry = (country) => {
    if (!country || !earth) return
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(country)}.json?access_token=${mapboxgl.accessToken}`)
      .then((res) => res.json())
      .then((r) => r.features?.[0] && (earth.setCenter(r.features[0].geometry.coordinates), earth.setZoom(5)))
  }

  const handleSongs = (playlist) => {
    localStorage.setItem('listed_playlist', JSON.stringify(playlist))
    if (showSongs === playlist.id) setShowSongs(null)
    else { setSongsComponent(<Songs playlist_id={playlist.id} />); setShowSongs(playlist.id) }
  }

  const togglePausePlay = () => {
    if (!currentlyPlaying.is_playing && currentlyPlaying.is_playing !== false) return
    const endpoint = currentlyPlaying.is_playing ? 'pause' : 'play'
    const body = !currentlyPlaying.is_playing && currentlyPlaying.context ? JSON.stringify({ context_uri: currentlyPlaying.context.uri, offset: { uri: currentlyPlaying.item.uri }, position_ms: parseInt(localStorage.getItem('current_position') || '0') }) : undefined
    fetch(`https://api.spotify.com/v1/me/player/${endpoint}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' },
      body,
    })
  }

  const handleVolume = (e) => fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })

  const handleSeekPosition = (e) => {
    if (currentlyPlaying.item) {
      const pos = parseInt(String((parseFloat(e.target.value) * currentlyPlaying.item.duration_ms) / 100))
      localStorage.setItem('current_position', String(pos))
      fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${pos}`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    }
  }

  const msToTime = (d) => { const m = Math.floor((d / 60000) % 60), s = Math.floor((d / 1000) % 60); return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}` }
  const handlePrevious = () => fetch('https://api.spotify.com/v1/me/player/previous', { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
  const handleForward = () => fetch('https://api.spotify.com/v1/me/player/next', { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
  const toggleLike = () => currentlyPlaying.item && fetch(`https://api.spotify.com/v1/me/tracks?ids=${currentlyPlaying.item.id}`, { method: isSaved ? 'DELETE' : 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' } })

  const playlists = playlistStore || (localStorage.getItem('countrys_top_fifths') ? JSON.parse(localStorage.getItem('countrys_top_fifths')) : null)

  return (
    <>
      <div className="settings" style={{ textAlign: openSettings ? 'end' : 'initial' }}>
        <div className="settings-content" style={{ display: openSettings ? 'block' : 'none' }}>
          <div className="modes">
            <div className="search-form">
              <input name="search-input" type="text" className="search-input" value={searchCountry || ''} onKeyDown={(e) => e.key === 'Enter' && handleSearchCountry(searchCountry)} onChange={(e) => setSearch(e.target.value)} />
              <div className="search-button"><input type="image" src={magnifier} alt="search" className="icon" onClick={() => handleSearchCountry(searchCountry)} /></div>
            </div>
            <div>
              <button className="map-style-button" onClick={handleStyleMap}>{dark === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
              <button className="toggle-player-button" onClick={() => { setShowCurrentPlaying(!showCurrentPlaying); localStorage.setItem('show_currently_playing', String(!showCurrentPlaying)) }}>{showCurrentPlaying ? 'Hide Controls' : 'Show Controls'}</button>
            </div>
          </div>
          <div className="lists">
            <ul>
              {playlists?.map((p) => (
                <li key={p.id} className="playlist-list">
                  <div className="li-text" onClick={() => handleChangePlaylist(p)}>{p.name}</div>
                  <button className="songs-button" onClick={() => handleSongs(p)}>{showSongs === p.id ? '▼' : '►'}</button>
                  {showSongs === p.id && songsComponent}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="toggle-settings" onClick={() => setSettings(!openSettings)}></button>
      </div>
      <div id="map" className="App"></div>
      {showCurrentPlaying && (
        <div className="now-playing">
          <img className="now-playing-image" src={currentlyPlaying.item?.album?.images?.slice(-1)[0]?.url || earthmusic} alt="album" />
          <img className="now-playing-like" onClick={toggleLike} src={isSaved ? unlike : like} alt="like" />
          <div className="now-playing-info">
            <p className="now-playing-track-name">{currentlyPlaying.item?.name}</p>
            <p className="now-playing-artist-name">{currentlyPlaying.item?.artists?.map((a) => a.name).join(', ')}</p>
          </div>
          <div className="now-playing-duration">{currentlyPlaying.progress_ms ? msToTime(currentlyPlaying.progress_ms) : '0:00'}</div>
          <div className="now-playing-progress">
            <input className="now-playing-slider" style={{ background: currentlyPlaying.item ? `linear-gradient(90deg, rgb(0,128,128) ${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100}%, rgb(255,255,255) ${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100}%)` : 'white', width: '90%' }} type="range" min="0" max="100" step="0.01" value={currentlyPlaying.item ? (currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100 : 0} onChange={handleSeekPosition} />
          </div>
          <div className="now-playing-volume">
            <img className="volume-icon" src={volume} alt="volume" />
            <input id="volume" className="now-playing-slider" style={{ background: activeDevice.volume_percent != null ? `linear-gradient(90deg, rgb(0,128,128) ${activeDevice.volume_percent}%, rgb(255,255,255) ${activeDevice.volume_percent}%)` : 'white', width: '70%' }} type="range" min="0" max="100" value={activeDevice.volume_percent || 0} onChange={handleVolume} />
          </div>
          <div className="now-playing-turn">
            <button className="now-playing-turn-prev" onClick={handlePrevious}><img src={previous} alt="previous" /></button>
            <button className="now-playing-turn-play" onClick={togglePausePlay}>{currentlyPlaying.is_playing ? <img src={pause} alt="pause" /> : <img src={play} alt="play" />}</button>
            <button className="now-playing-turn-forw" onClick={handleForward}><img src={forward} alt="forward" /></button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
