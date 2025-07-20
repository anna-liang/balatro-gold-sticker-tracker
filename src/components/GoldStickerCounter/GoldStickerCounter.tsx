import { Joker, Sticker } from 'types';
import styles from './GoldStickerCounter.module.css';
import { stickersUriPath } from '../../constants';

function GoldStickerCounter({ jokerProgress }: { jokerProgress: Joker[] }) {
  const goldStickerCount = jokerProgress.filter(
    (joker) => joker.sticker === Sticker.Gold,
  ).length;

  return (
    <div className={styles.counter}>
      <img
        src={`${stickersUriPath}gold-sticker.png`}
        alt={`gold sticker`}
        className={styles.sticker}
      />
      <div className={styles.count}>{goldStickerCount}</div>
    </div>
  );
}

export default GoldStickerCounter;
