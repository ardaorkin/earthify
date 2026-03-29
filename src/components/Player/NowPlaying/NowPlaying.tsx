import { ReactNode } from 'react'
import './NowPlaying.css'

interface NowPlayingProps { children: ReactNode }

export function NowPlaying({ children }: NowPlayingProps) {
  return <div className="now-playing">{children}</div>
}
