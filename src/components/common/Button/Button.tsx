import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({ children, onClick, className = '', disabled }: ButtonProps) {
  return <button className={`btn ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}
