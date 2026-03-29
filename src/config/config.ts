/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

export const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID || ''
export const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || ''
export const redirect_uri = import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/earthify`
export const mapbox_access_token = import.meta.env.VITE_MAPBOX_TOKEN || ''
