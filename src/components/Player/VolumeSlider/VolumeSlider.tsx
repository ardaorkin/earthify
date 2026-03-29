import volume from '../../../icons/volume.png'
import './VolumeSlider.css'

interface VolumeSliderProps { volumePercent: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }

export function VolumeSlider({ volumePercent, onChange }: VolumeSliderProps) {
  return (
    <div className="now-playing-volume">
      <img className="volume-icon" src={volume} alt="volume" />
      <input id="volume" className="now-playing-slider" style={{ background: `linear-gradient(90deg, rgb(0,128,128) ${volumePercent}%, rgb(255,255,255) ${volumePercent}%)`, width: '70%' }} type="range" min="0" max="100" value={volumePercent} onChange={onChange} />
    </div>
  )
}
