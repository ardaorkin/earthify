import like from '../../../icons/like.png'
import unlike from '../../../icons/unlike.png'
import './LikeButton.css'

interface LikeButtonProps { isSaved: boolean; onClick: () => void }

export function LikeButton({ isSaved, onClick }: LikeButtonProps) {
  return <img className="now-playing-like" onClick={onClick} src={isSaved ? unlike : like} alt="like" />
}
