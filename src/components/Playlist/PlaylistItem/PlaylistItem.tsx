import { ReactNode } from 'react'
import './PlaylistItem.css'

interface PlaylistItemProps { name: string; isExpanded: boolean; onPlay: () => void; onToggleSongs: () => void; children?: ReactNode }

export function PlaylistItem({ name, isExpanded, onPlay, onToggleSongs, children }: PlaylistItemProps) {
  return (
    <li className="playlist-list">
      <div className="li-text" onClick={onPlay}>{name}</div>
      <button className="songs-button" onClick={onToggleSongs}>{isExpanded ? '▼' : '►'}</button>
      {isExpanded && children}
    </li>
  )
}
