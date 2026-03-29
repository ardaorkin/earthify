import { ReactNode } from 'react'
import './PlaylistList.css'

interface PlaylistListProps { children: ReactNode }

export function PlaylistList({ children }: PlaylistListProps) {
  return <div className="lists"><ul>{children}</ul></div>
}
