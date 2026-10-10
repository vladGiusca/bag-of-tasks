import { SPRITES } from './sprites'

interface Props {
  onClick: () => void
}

// Nested wrappers let each axis animate independently: .coin-x moves sideways
// at constant speed while .coin-y arcs up and falls, giving a parabolic flight.
// .coin-bob then idles once it has landed and the sprite itself spins.
export function Coin({ onClick }: Props) {
  return (
    <button type="button" className="coin" aria-label="Open your task" onClick={onClick}>
      <span className="coin-x">
        <span className="coin-y">
          <span className="coin-bob">
            <img className="coin-sprite" src={SPRITES.coin.url} alt="" draggable={false} />
          </span>
        </span>
      </span>
    </button>
  )
}
