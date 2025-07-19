import { useState } from 'react';
import { stickersUriPath } from '../../constants';
import { Joker } from 'types';
import styles from './JokerTile.module.css';
import JokerModal from 'components/JokerModal/JokerModal';

function JokerTile({ id, name, uri, sticker }: Joker) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.jokerTile} onClick={handleOpenModal}>
      <JokerModal
        isOpen={openModal}
        onClose={handleCloseModal}
        id={id}
        name={name}
        uri={uri}
        sticker={sticker}
      />
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
