import { useState } from 'react';
import { Sticker } from '../../constants';
import { Joker } from 'types';
import styles from './JokerTile.module.css';

function JokerTile({ name, uri }: Joker) {
  const defaultBorderColor = '#0a263a';
  const [borderColour, setBorderColour] = useState(defaultBorderColor);
  const stickersUriPath = '/stickers/';
  const sticker = Sticker.Black;

  const handleOnMouseEnter = () => {
    setBorderColour('#a2b8bf');
  };

  const handleOnMouseLeave = () => {
    setBorderColour(defaultBorderColor);
  };

  return (
    <div
      className={styles.jokerTile}
      style={{ borderColor: borderColour }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <img
        src={`${stickersUriPath}${sticker}-sticker.png`}
        alt={`${name}`}
        className={styles.sticker}
      />
      <img src={uri} alt={`${name}`} className={styles.jokerImg} />
      <div className={styles.jokerName}>{name.toUpperCase()}</div>
    </div>
  );
}

export default JokerTile;
