import { useState } from 'react';
import { stickersUriPath } from '../../constants';
import { Joker } from 'types';
import styles from './JokerTile.module.css';
import JokerModal from 'components/JokerModal/JokerModal';

function JokerTile({ id, name, uri, sticker }: Joker) {
  const defaultBorderColor = '#0a263a';
  const [borderColour, setBorderColour] = useState(defaultBorderColor);
  const [openModal, setOpenModal] = useState(false);

  const handleOnMouseEnter = () => {
    setBorderColour('#415055ff');
  };

  const handleOnMouseLeave = () => {
    setBorderColour(defaultBorderColor);
  };

  const handleOpenModal = () => {
    // console.log('open');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    // console.log('close');
    setOpenModal(false);
  };

  return (
    <div
      className={styles.jokerTile}
      style={{ borderColor: borderColour }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOpenModal}
    >
      <div
        style={{
          position: 'absolute',
          top: '0px',
        }}
      >
        <JokerModal
          isOpen={openModal}
          onClose={handleCloseModal}
          id={id}
          name={name}
          uri={uri}
          sticker={sticker}
        />
      </div>
      <div>
        {sticker ? (
          <img
            src={`${stickersUriPath}${sticker}-sticker.png`}
            alt={`${name}`}
            className={styles.sticker}
          />
        ) : null}
        <img src={uri} alt={`${name}`} className={styles.jokerImg} />
        <div className={styles.jokerName}>{name.toUpperCase()}</div>
      </div>
    </div>
  );
}

export default JokerTile;
