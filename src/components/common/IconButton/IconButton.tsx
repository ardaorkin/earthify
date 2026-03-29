import './IconButton.css'

interface IconButtonProps {
  src: string
  alt: string
  onClick?: () => void
  className?: string
}

export function IconButton({ src, alt, onClick, className = '' }: IconButtonProps) {
  return <button className={`icon-btn ${className}`} onClick={onClick}><img src={src} alt={alt} /></button>
}
