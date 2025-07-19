import { Dialog, DialogPanel, Button } from '@headlessui/react';
import { Sticker } from 'types';
import styles from './JokerModal.module.css';
import { stickersUriPath } from '../../constants';
import { useState } from 'react';

function JokerModal({
  isOpen,
  onClose,
  id,
  name,
  uri,
  sticker,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  name: string;
  uri: string;
  sticker: Sticker | null;
}) {
  const [currentSticker, setCurrentSticker] = useState(sticker);

  const renderStickers = () => {
    const stickers = Object.values(Sticker).map((s) => {
      return (
        <img
          src={`${stickersUriPath}${s}-sticker.png`}
          alt={`${name}`}
          key={s}
          className={styles.sticker}
          style={{ opacity: s === currentSticker ? '1.0' : '0.5' }}
          onClick={() => setCurrentSticker(s)}
        />
      );
    });
    return stickers;
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setCurrentSticker(sticker);
        onClose();
      }}
      className={styles.modal}
    >
      <div className={styles.panelContainer}>
        <DialogPanel>
          <div className={styles.modelContent}>
            <img src={uri} alt={`${name}`} className={styles.jokerImg} />
            <div className={styles.jokerName}>{name.toUpperCase()}</div>
            <div className={styles.stickers}>{renderStickers()}</div>
            <div className={styles.buttons}>
              <Button className={styles.saveButton} onClick={handleSave}>
                SAVE
              </Button>
              <Button
                className={styles.cancelButton}
                onClick={() => {
                  setCurrentSticker(sticker);
                  onClose();
                }}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default JokerModal;
