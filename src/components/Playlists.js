import React, { useState } from 'react'
import { useStyles } from './Styles'

export default function Playlists(props) {
    const classes = useStyles();
    const [playlists, setPlaylists] = useState()

    React.useEffect(() => {
        setInterval(() => {
            setPlaylists(JSON.parse(localStorage.getItem('playlists')))
        })
    })



    var handleChangePlaylist = (playlist) => {
        
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({ context_uri: playlist.uri })
        })
        .then(res => res.json())
        .then(result => console.log(result))
    }

    return (
        <>
            {playlists ?
                playlists.map(playlist => {
                    return (
                        <ul>
                            <li onClick={handleChangePlaylist(playlist)}>{playlist.name}</li>
                        </ul>
                    )
                })
                : null}
        </>
    )

}