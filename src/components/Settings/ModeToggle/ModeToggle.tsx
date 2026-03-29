import './ModeToggle.css'

interface ModeToggleProps { mapStyle: 'light' | 'dark'; onStyleChange: () => void; showControls: boolean; onControlsToggle: () => void }

export function ModeToggle({ mapStyle, onStyleChange, showControls, onControlsToggle }: ModeToggleProps) {
  return (
    <div className="mode-toggle">
      <button className="map-style-button" onClick={onStyleChange}>{mapStyle === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
      <button className="toggle-player-button" onClick={onControlsToggle}>{showControls ? 'Hide Controls' : 'Show Controls'}</button>
    </div>
  )
}
