/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/
import earthmusic from '../icons/earthmusic.png'
import { client_secret, client_id, redirect_uri } from '../config/config'

const SCOPES = 'user-library-read user-library-modify user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private'

export default function Intro() {
  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(SCOPES)}&show_dialog=true`
  }

  if (window.location.search.includes('?code=')) {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      localStorage.setItem('logged_in', 'true')
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`,
      })
        .then((res) => res.json())
        .then((result) => {
          localStorage.setItem('access_token', result.access_token)
          localStorage.setItem('refresh_token', result.refresh_token)
          localStorage.setItem('auth', 'true')
        })
        .then(() => { window.location.href = window.location.origin + '/earthify' })
        .catch((err) => console.error('Auth error:', err))
    }
  }

  return (
    <div className="intro">
      <div><img src={earthmusic} alt="earthify-icon" className="intro-icon" /></div>
      <div><button className="intro-button" onClick={handleLogin}>Login</button></div>
    </div>
  )
}
