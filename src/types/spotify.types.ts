/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

export interface SpotifyImage {
  url: string
  width: number
  height: number
}

export interface SpotifyArtist {
  id: string
  name: string
  uri: string
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: SpotifyImage[]
  uri: string
}

export interface SpotifyTrack {
  id: string
  name: string
  uri: string
  duration_ms: number
  artists: SpotifyArtist[]
  album: SpotifyAlbum
}

export interface SpotifyPlaylist {
  id: string
  name: string
  uri: string
  description: string | null
  images: SpotifyImage[]
  owner: {
    id: string
    display_name: string
  }
  tracks: {
    total: number
  }
}

export interface SpotifyDevice {
  id: string
  name: string
  type: string
  is_active: boolean
  is_restricted: boolean
  volume_percent: number
}

export interface PlayerState {
  is_playing: boolean
  progress_ms: number
  item: SpotifyTrack | null
  device: SpotifyDevice
  context: {
    uri: string
    type: string
  } | null
  shuffle_state: boolean
  repeat_state: string
}

export interface PlaylistTracksResponse {
  items: Array<{
    track: SpotifyTrack
    added_at: string
  }>
  total: number
  next: string | null
}
