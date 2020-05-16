/*
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
*/
import React from 'react'

class Songs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: null
        }
        this.handlePlaySong = this.handlePlaySong.bind(this)
    }


    componentDidMount() {
        fetch(`https://api.spotify.com/v1/playlists/${this.props.playlist_id}/tracks`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.error !== undefined) {

                    if (result.error.status === 401) {
                        fetch("https://accounts.spotify.com/api/token", {
                            method: "POST",
                            headers: {
                                "Authorization": "Basic OWU3MWE0ZGEzZWUyNGQzMWFiNGZkODQyNjA3Y2NlOWU6OTA3ZTQzMmNkM2Q3NDU1NGIyOTU4MmViNTg3NTYyNzc=",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Accept": "application/json"
                            },
                            body: `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}`
                        })
                            .then(res => res.json())
                            .then(result => {
                                console.log("updating access token...")
                                localStorage.setItem('access_token', result.access_token)
                            })
                            .then(() => console.log("acess token were refresh\nnew access token: ", localStorage.getItem('access_token')))
                            .then(() => window.location.reload())
                    }
                }
                this.setState({
                    playlist: result
                })
            })
    }

    handlePlaySong = (e) => {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ uris: [e] })
        })
            .then(res => res)
            .then(result => {
                console.log("song_playing: ", result)
                if(result.status === 404) {
                    alert('Please open Spotify App in your device')
                }
            })
    }

    render() {
        return (
            <>
                {this.state.playlist != null ?
                    this.state.playlist.items.map(el => {
                        return <li key={el.track.id} onClick={() => this.handlePlaySong(el.track.uri)} className="songs-list">{el.track.name} - {el.track.artists.map(artist => {
                            return artist.name
                        })}</li>
                    })
                    : null}
            </>
        )
    }
}

export default Songs