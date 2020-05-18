import React, { useEffect } from 'react'
import earthmusic from './earthmusic.png'
import {client_secret, client_id, mapbox_access_token, redirect_uri} from './config/config'

export default function Intro() {

    var scopes = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private';

    var handleLogin = () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&show_dialog=true`
      }
      
      if (window.location.search.match(/\?code/g) !== null) {
        localStorage.setItem('logged_in', true)
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