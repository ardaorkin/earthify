import { useState, ReactNode } from 'react'
import './SettingsPanel.css'

interface SettingsPanelProps { children?: ReactNode }

export function SettingsPanel({ children }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="settings" style={{ textAlign: isOpen ? 'end' : 'initial' }}>
      <div className="settings-content" style={{ display: isOpen ? 'block' : 'none' }}>{children}</div>
      <button className="toggle-settings" onClick={() => setIsOpen(!isOpen)}></button>
    </div>
  )
}
