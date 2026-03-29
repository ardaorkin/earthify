import play from '../../../icons/play.png'
import pause from '../../../icons/pause.png'
import previous from '../../../icons/previous.png'
import forward from '../../../icons/forward.png'
import './PlaybackControls.css'

interface PlaybackControlsProps { isPlaying: boolean; onPrevious: () => void; onTogglePlay: () => void; onNext: () => void }

export function PlaybackControls({ isPlaying, onPrevious, onTogglePlay, onNext }: PlaybackControlsProps) {
  return (
    <div className="now-playing-turn">
      <button className="now-playing-turn-prev" onClick={onPrevious}><img src={previous} alt="previous" /></button>
      <button className="now-playing-turn-play" onClick={onTogglePlay}>{isPlaying ? <img src={pause} alt="pause" /> : <img src={play} alt="play" />}</button>
      <button className="now-playing-turn-forw" onClick={onNext}><img src={forward} alt="forward" /></button>
    </div>
  )
}
