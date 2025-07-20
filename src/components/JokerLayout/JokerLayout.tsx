import { useState, useEffect, useCallback, JSX, createContext } from 'react';
import JokerTile from 'components/JokerTile/JokerTile';
import styles from './JokerLayout.module.css';
import SortByDropdown from 'components/SortByDropdown/SortByDropdown';
import axios from 'axios';
import { Joker, SortOptions, Sticker } from 'types';
import { SERVER_BASE_URI } from '../../constants';
import { sortByHelper } from 'components/SortByDropdown/helpers';

export const UpdateStickerContext = createContext(
  (id: number, sticker: Sticker | null) => {},
);

function JokerLayout() {
  const [jokerLayout, setJokerLayout] = useState<JSX.Element[]>([]);
  const [jokerProgress, setJokerProgress] = useState<Joker[]>([]);

  const updateSticker = (id: number, sticker: Sticker | null) => {
    const jokerIndex = jokerProgress.findIndex((joker) => id === joker.id);
    if (jokerIndex !== -1) {
      jokerProgress[jokerIndex] = {
        ...jokerProgress[jokerIndex],
        sticker: sticker,
      };
      setJokerProgress([...jokerProgress]);
    }
  };

  const fetchJokers = async () => {
    const response = await axios
      .get(SERVER_BASE_URI)
      .then(({ data }) => {
        const jokers = data.map((joker: Joker) => {
          return {
            ...joker,
            uri: joker.uri === '' ? `/jokers/${joker.name}.png` : joker.uri,
          };
        });
        return jokers;
      })
      .catch((error) => console.error(error));
    setJokerProgress(response);
  };

  const renderJokerProgress = useCallback(async () => {
    const result = jokerProgress.map((joker: Joker) => {
      return <JokerTile {...joker} key={joker.name} />;
    });
    setJokerLayout(result);
  }, [jokerProgress]);

  useEffect(() => {
    (async function () {
      await fetchJokers();
    })();
  }, []);

  useEffect(() => {
    renderJokerProgress();
  }, [jokerProgress, renderJokerProgress]);

  const handleSortBy = (option: SortOptions) => {
    const sortedResult = sortByHelper({ jokerProgress, option });
    setJokerProgress([...sortedResult]);
  };

  return (
    <div>
      {<SortByDropdown handleSortBy={handleSortBy} />}
      <UpdateStickerContext.Provider value={updateSticker}>
        <div className={styles.jokerLayout}>{jokerLayout}</div>
      </UpdateStickerContext.Provider>
    </div>
  );
}

export default JokerLayout;
