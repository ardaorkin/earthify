import { useCallback } from 'react'
import { authService } from '../services'

export function useSpotifyApi() {
  const fetchWithAuth = useCallback(async <T>(url: string, options: RequestInit = {}): Promise<T | null> => {
    const token = authService.getAccessToken()
    const response = await fetch(url, {
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
  }, [])

  return { fetchWithAuth }
}
