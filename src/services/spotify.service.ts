/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

import type { SpotifyPlaylist, SpotifyDevice, PlayerState, PlaylistTracksResponse } from '../types'
import { authService } from './auth.service'

const API_BASE = 'https://api.spotify.com/v1'

class SpotifyService {
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    const token = authService.getAccessToken()
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers },
    })
    if (response.status === 401) {
      const refresh = authService.getRefreshToken()
      if (refresh) {
        const result = await authService.refreshToken(refresh)
        authService.setTokens(result.access_token)
        window.location.reload()
      }
      return null
    }
    if (response.status === 204) return null
    return response.json()
  }

  getPlayer = () => this.fetch<PlayerState>('/me/player')
  getDevices = () => this.fetch<{ devices: SpotifyDevice[] }>('/me/player/devices')
  pause = () => this.fetch('/me/player/pause', { method: 'PUT' })
  play = (body?: { context_uri?: string; offset?: { uri: string }; position_ms?: number }) =>
    this.fetch('/me/player/play', { method: 'PUT', body: body ? JSON.stringify(body) : undefined })
  next = () => this.fetch('/me/player/next', { method: 'POST' })
  previous = () => this.fetch('/me/player/previous', { method: 'POST' })
  seek = (positionMs: number) => this.fetch(`/me/player/seek?position_ms=${positionMs}`, { method: 'PUT' })
  setVolume = (percent: number) => this.fetch(`/me/player/volume?volume_percent=${percent}`, { method: 'PUT' })
  searchPlaylists = (query: string) => this.fetch<{ playlists: { items: SpotifyPlaylist[] } }>(`/search?q=${encodeURIComponent(query)}&type=playlist`)
  getPlaylistTracks = (playlistId: string) => this.fetch<PlaylistTracksResponse>(`/playlists/${playlistId}/tracks`)
  checkSavedTracks = (ids: string[]) => this.fetch<boolean[]>(`/me/tracks/contains?ids=${ids.join(',')}`)
  saveTracks = (ids: string[]) => this.fetch(`/me/tracks?ids=${ids.join(',')}`, { method: 'PUT' })
  removeTracks = (ids: string[]) => this.fetch(`/me/tracks?ids=${ids.join(',')}`, { method: 'DELETE' })
  getCurrentUser = () => this.fetch<{ id: string; display_name: string }>('/me')
  createPlaylist = (userId: string, name: string, isPublic: boolean, description: string) =>
    this.fetch<SpotifyPlaylist>(`/users/${userId}/playlists`, { method: 'POST', body: JSON.stringify({ name, public: isPublic, description }) })
}

export const spotifyService = new SpotifyService()
