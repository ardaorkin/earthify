import earthmusic from '../../../icons/earthmusic.png'
import './TrackInfo.css'

interface TrackInfoProps { name?: string; artists?: string; albumArt?: string }

export function TrackInfo({ name, artists, albumArt }: TrackInfoProps) {
  return (
    <>
      <img className="now-playing-image" src={albumArt || earthmusic} alt="album" />
      <div className="now-playing-info">
        <p className="now-playing-track-name">{name || 'No track playing'}</p>
        <p className="now-playing-artist-name">{artists || ''}</p>
      </div>
    </>
  )
}
