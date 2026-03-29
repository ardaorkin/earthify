import { useEffect, useState } from 'react'
import type { PlaylistTracksResponse } from '../../../types'
import './Songs.css'

interface SongsProps { playlistId: string }

export function Songs({ playlistId }: SongsProps) {
  const [tracks, setTracks] = useState<PlaylistTracksResponse | null>(null)

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    })
      .then((res) => res.json())
      .then((result) => setTracks(result))
  }, [playlistId])

  const handlePlaySong = (trackUri: string) => {
    const listedPlaylist = localStorage.getItem('listed_playlist')
    if (!listedPlaylist) return
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ context_uri: JSON.parse(listedPlaylist).uri, offset: { uri: trackUri } }),
    }).then((r) => r.status === 404 && alert('Please open Spotify App in your device'))
  }

  return (
    <>
      {tracks?.items?.map((el) => (
        <li key={el.track.id} onClick={() => handlePlaySong(el.track.uri)} className="songs-list">
          {el.track.name} - {el.track.artists.map((a) => a.name).join(', ')}
        </li>
      ))}
    </>
  )
}
