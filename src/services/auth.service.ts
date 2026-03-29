/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

import { client_id, client_secret, redirect_uri } from '../config/config'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const AUTH_URL = 'https://accounts.spotify.com/authorize'

interface TokenResponse {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in: number
}

class AuthService {
  getAuthUrl(scopes: string): string {
    const params = new URLSearchParams({
      client_id,
      response_type: 'code',
      redirect_uri,
      scope: scopes,
      show_dialog: 'true',
    })
    return `${AUTH_URL}?${params.toString()}`
  }

  async exchangeCode(code: string): Promise<TokenResponse> {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri, client_id, client_secret }),
    })
    return response.json()
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken, client_id, client_secret }),
    })
    return response.json()
  }

  getAccessToken(): string | null { return localStorage.getItem('access_token') }
  getRefreshToken(): string | null { return localStorage.getItem('refresh_token') }
  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem('access_token', accessToken)
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken)
  }
  isAuthenticated(): boolean { return localStorage.getItem('auth') === 'true' }
  setAuthenticated(value: boolean): void { localStorage.setItem('auth', String(value)) }
  logout(): void { ['access_token', 'refresh_token', 'auth', 'logged_in'].forEach((k) => localStorage.removeItem(k)) }
}

export const authService = new AuthService()
