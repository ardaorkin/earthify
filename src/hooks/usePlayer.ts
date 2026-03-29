import { useState, useEffect, useCallback } from 'react'
import type { PlayerState, SpotifyDevice } from '../types'
import { spotifyService } from '../services'

export function usePlayer() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<PlayerState | null>(null)
  const [activeDevice, setActiveDevice] = useState<SpotifyDevice | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('logged_in')) return
    const interval = setInterval(async () => {
      const player = await spotifyService.getPlayer()
      if (player) {
        setCurrentlyPlaying(player)
        if (player.item) {
          const saved = await spotifyService.checkSavedTracks([player.item.id])
          if (saved) setIsSaved(saved[0] ?? false)
        }
        localStorage.setItem('current_position', String(player.progress_ms))
      }
      const devices = await spotifyService.getDevices()
      const active = devices?.devices.find((d) => d.is_active)
      if (active) setActiveDevice(active)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const play = useCallback((contextUri?: string, offset?: { uri: string }, positionMs?: number) =>
    spotifyService.play(contextUri ? { context_uri: contextUri, offset, position_ms: positionMs } : undefined), [])
  const pause = useCallback(() => spotifyService.pause(), [])
  const next = useCallback(() => spotifyService.next(), [])
  const previous = useCallback(() => spotifyService.previous(), [])
  const seek = useCallback((ms: number) => spotifyService.seek(ms), [])
  const setVolume = useCallback((percent: number) => spotifyService.setVolume(percent), [])
  const toggleLike = useCallback(async () => {
    if (!currentlyPlaying?.item) return
    if (isSaved) await spotifyService.removeTracks([currentlyPlaying.item.id])
    else await spotifyService.saveTracks([currentlyPlaying.item.id])
  }, [currentlyPlaying, isSaved])

  return { currentlyPlaying, activeDevice, isSaved, isPlaying: currentlyPlaying?.is_playing ?? false, progress: currentlyPlaying?.progress_ms ?? 0, play, pause, next, previous, seek, setVolume, toggleLike }
}
