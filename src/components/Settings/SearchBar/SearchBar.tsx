import { useState } from 'react'
import magnifier from '../../../icons/magnifier.png'
import './SearchBar.css'

interface SearchBarProps { onSearch: (query: string) => void }

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  return (
    <div className="search-form">
      <input type="text" className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch(query)} />
      <div className="search-button"><input type="image" src={magnifier} alt="search" className="icon" onClick={() => onSearch(query)} /></div>
    </div>
  )
}
