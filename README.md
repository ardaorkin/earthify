# Earthify - music app
A music app created with ReactJS, Spotify API and Mapbox

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)
* [Illustrations](#illustrations)

## General info
This project let you listen World's Top 50th hit songs.

By clicking elsewhere on the map you can get list of playlists named like ```{contury_name} Top 500```. On head of the list, playlist created by Spotify charts would seen if exist. If Spotify charts does not create a top 50 playlist for this country,  most popular top 50 list of clicked country would took place on head of the list. If there is not found any top 50 playlist for clicked country, Earthify provide option to create one. It can create as public or private, depends on users choise.

In addition to this main properties, you can control your Spotify player via the Earthify, like currently playing song, increase or decrease volume, navigate between playlists...

## Technologies
Project is created with:

* ReactJS
* Spotify API
* Mapbox

## Setup
You will need to Spotify API credentials and Mapbox access token.
```
git clone http://github/ardaorkin/earthify.git
cd earthify
yarn install
cp src/config/config_sample.js src/config/config.js
vim src/config/config.js
*fill the fields with your credentials*
```


## Illustrations

![Intro](./public/images/intro.png =700x)
![Opening](./public/images/opening.png =700x)
![Light mode one](./public/images/light-one.png =700x)
![Dark mode one](./public/images/dark-one.png =700x)
![Dark mode two](./public/images/dark-two.png =700x)
![Dark mode three](./public/images/dark-three.png =700x)
![Playlist one](./public/images/playlist-one.png =700x)
![Playlist two](./public/images/playlist-two.png =700x)
![Playlist three](./public/images/playlist-three.png =700x)

### Responsive
![Responsive light one](./public/images/responsive-light.jpeg =200x)
![Responsive dark one](./public/images/responsive-dark-one.jpeg =200x)
![Responsive playlist one](./public/images/responsive-playlist-one.jpeg =200x)
![Responsive playlist two](./public/images/responsive-playlist-two.jpeg =200x)
![Responsive playlist three](./public/images/responsive-playlist-three.jpeg =200x)