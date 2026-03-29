import './ProgressBar.css'

interface ProgressBarProps { progressMs: number; durationMs: number; onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void }

function msToTime(d: number): string { const m = Math.floor((d / 60000) % 60), s = Math.floor((d / 1000) % 60); return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}` }

export function ProgressBar({ progressMs, durationMs, onSeek }: ProgressBarProps) {
  const percent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0
  return (
    <>
      <div className="now-playing-duration">{msToTime(progressMs)}</div>
      <div className="now-playing-progress">
        <input className="now-playing-slider" style={{ background: `linear-gradient(90deg, rgb(0,128,128) ${percent}%, rgb(255,255,255) ${percent}%)`, width: '90%' }} type="range" min="0" max="100" step="0.01" value={percent} onChange={onSeek} />
      </div>
    </>
  )
}
