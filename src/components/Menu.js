import React from 'react'
import {useStyles} from './Styles'
import Playlists from './Playlists'


export default function Menu(props) {

    const classes = useStyles()

    return (
        <div className={classes.paper}>
            <Playlists {...props} />
        </div>
    )
}