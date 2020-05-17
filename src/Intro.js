import React, { useEffect } from 'react'
import earthmusic from './earthmusic.png'

export default function Intro() {

    var client_id = "9e71a4da3ee24d31ab4fd842607cce9e";
    var client_secret = "907e432cd3d74554b29582eb58756277";
    var ciCsB64 = "OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc="
    // var redirect_uri = "http://localhost:3000/callback"
    var redirect_uri = window.location.origin + window.location.pathname
    var scopes = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private';

    var handleLogin = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`
      }
      
      
      
      if (window.location.search.match(/\?code/g) !== null) {
        localStorage.setItem('logged_in', true)
        fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            //"Authorization": "Basic " + ciCsB64,
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
          .then(() => window.location = window.location.origin + "/earthify")
          .then(() => window.localStorage.setItem('auth', true))
          .catch(err => console.log("acees_token_respone: ", err))
      }

    return(
        <div className="intro">
            <div>
            <img src={earthmusic} alt="earthify-icon" className="intro-icon"></img>
            </div>
            <div>
            <button className="intro-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}