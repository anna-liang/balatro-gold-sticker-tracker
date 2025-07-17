import { Sticker } from '../constants';
import { Joker } from 'types';

function JokerTile({ name, uri }: Joker) {
  const stickersUriPath = '/stickers/';
  const sticker = Sticker.Black;
  return (
    <div>
      {name}
      <img src={uri} alt={`${name}`} />
      <img src={`${stickersUriPath}${sticker}-sticker.png`} />
    </div>
  );
}

export default JokerTile;
