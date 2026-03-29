import './Slider.css'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  fillColor?: string
  width?: string
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, fillColor = 'rgb(0,128,128)', width = '100%' }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100
  return (
    <input
      type="range"
      className="slider"
      style={{ background: `linear-gradient(90deg, ${fillColor} ${percent}%, rgb(255,255,255) ${percent}%)`, width }}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}
