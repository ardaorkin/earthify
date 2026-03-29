import earthmusic from '../../icons/earthmusic.png'
import { authService } from '../../services'
import './Intro.css'

const SCOPES = 'user-library-read user-library-modify user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private'

export function Intro() {
  const handleLogin = () => { window.location.href = authService.getAuthUrl(SCOPES) }

  if (window.location.search.includes('?code=')) {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      authService.exchangeCode(code).then((r) => {
        authService.setTokens(r.access_token, r.refresh_token)
        authService.setAuthenticated(true)
        localStorage.setItem('logged_in', 'true')
        window.location.href = window.location.origin + '/earthify'
      })
    }
  }

  return (
    <div className="intro">
      <div><img src={earthmusic} alt="earthify-icon" className="intro-icon" /></div>
      <div><button className="intro-button" onClick={handleLogin}>Login</button></div>
    </div>
  )
}
