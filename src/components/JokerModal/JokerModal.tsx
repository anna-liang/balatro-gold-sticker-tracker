import { Dialog, DialogPanel, Button } from '@headlessui/react';
import { Sticker } from 'types';
import styles from './JokerModal.module.css';
import { stickersUriPath } from '../../constants';
import { useContext, useState } from 'react';
import { UpdateStickerContext } from 'components/JokerLayout/JokerLayout';

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
  const updateSticker = useContext(UpdateStickerContext);

  const renderStickers = () => {
    const stickers = Object.values(Sticker).map((s, i) => {
      const currentStickerIndex = currentSticker
        ? Object.values(Sticker).findIndex((s2) => s2 === currentSticker)
        : -1;
      return (
        <img
          src={`${stickersUriPath}${s}-sticker.png`}
          alt={`${name}`}
          key={s}
          className={styles.sticker}
          style={{ opacity: currentStickerIndex >= i ? '1.0' : '0.5' }}
          onClick={() => setCurrentSticker(s)}
        />
      );
    });
    return stickers;
  };

  const handleSave = async () => {
    // optimistically update ui
    updateSticker(id, currentSticker);
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
            <div className={styles.jokerName}>{name.toUpperCase()}</div>
            <img src={uri} alt={`${name}`} className={styles.jokerImg} />
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
