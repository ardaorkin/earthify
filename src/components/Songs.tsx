/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/
// @ts-nocheck
import { useEffect, useState } from 'react'

export default function Songs({ playlist_id }) {
  const [playlist, setPlaylist] = useState(null)

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error?.status === 401) {
          fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { Authorization: 'Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=', 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
            body: `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}`,
          })
            .then((res) => res.json())
            .then((r) => localStorage.setItem('access_token', r.access_token))
            .then(() => window.location.reload())
        }
        setPlaylist(result)
      })
  }, [playlist_id])

  const handlePlaySong = (trackUri) => {
    const listedPlaylist = localStorage.getItem('listed_playlist')
    if (!listedPlaylist) return
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ context_uri: JSON.parse(listedPlaylist).uri, offset: { uri: trackUri } }),
    }).then((r) => r.status === 404 && alert('Please open Spotify App in your device'))
  }

  return (
    <>
      {playlist?.items?.map((el) => (
        <li key={el.track.id} onClick={() => handlePlaySong(el.track.uri)} className="songs-list">
          {el.track.name} - {el.track.artists.map((a) => a.name).join(', ')}
        </li>
      ))}
    </>
  )
}
