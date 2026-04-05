import { useState } from 'react';
import { stickersUriPath } from '../../constants';
import { Sticker } from 'types';
import styles from './JokerTile.module.css';
import JokerModal from 'components/JokerModal/JokerModal';

function JokerTile({
  id,
  name,
  description,
  uri,
  sticker,
}: {
  id: number;
  name: string;
  description: string;
  uri: string;
  sticker: Sticker | null;
}) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getStickerStyle = () => {
    if (name === 'Wee Joker') {
      return styles.weeJokerSticker;
    } else if (name === 'Golden Ticket') {
      return styles.goldenTicketSticker;
    } else if (name === 'Square Joker') {
      return styles.squareJokerSticker;
    }
    return styles.sticker;
  };

  return (
    <div className={styles.jokerTile} onClick={handleOpenModal}>
      <JokerModal
        isOpen={openModal}
        onClose={handleCloseModal}
        id={id}
        name={name}
        description={description}
        uri={uri}
        sticker={sticker}
      />
      <div>
        {sticker ? (
          <img
            src={`${stickersUriPath}${sticker}-sticker.png`}
            alt={`${name}`}
            className={getStickerStyle()}
          />
        ) : null}
        <img src={uri} alt={`${name}`} className={styles.jokerImg} />
        <div className={styles.jokerName}>{name.toUpperCase()}</div>
      </div>
    </div>
  );
}

export default JokerTile;
