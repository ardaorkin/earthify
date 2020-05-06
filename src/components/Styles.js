import React from 'react'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: "100vh",
        width: "15%",
        backgroundColor: "black",
        color: "white",
        position: "absolute",
        left: "0",
        opacity: "0.9"
    }
}))

export { useStyles }