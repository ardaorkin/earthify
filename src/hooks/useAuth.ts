import { useState, useCallback } from 'react'
import { authService } from '../services'

const SCOPES = 'user-library-read user-library-modify user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private'

export function useAuth() {
  const [isAuthenticated] = useState(() => authService.isAuthenticated())
  const [accessToken] = useState(() => authService.getAccessToken())

  const login = useCallback(() => {
    window.location.href = authService.getAuthUrl(SCOPES)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    window.location.reload()
  }, [])

  const refreshToken = useCallback(async () => {
    const refresh = authService.getRefreshToken()
    if (refresh) {
      const result = await authService.refreshToken(refresh)
      authService.setTokens(result.access_token)
      window.location.reload()
    }
  }, [])

  return { isAuthenticated, accessToken, login, logout, refreshToken }
}
