import { useState, useEffect, useCallback, JSX, createContext } from 'react';
import JokerTile from 'components/JokerTile/JokerTile';
import styles from './JokerLayout.module.css';
import SortByDropdown from 'components/SortByDropdown/SortByDropdown';
import { Joker, SortOptions, Sticker } from 'types';
import { sortByHelper } from 'components/SortByDropdown/helpers';
import GoldStickerCounter from 'components/GoldStickerCounter/GoldStickerCounter';
import SearchBar from 'components/SearchBar/SearchBar';
import jokerTemplate from '../../store/joker-progress-template.json';

export const UpdateStickerContext = createContext(
  (id: number, sticker: Sticker | null) => {},
);

function JokerLayout() {
  const [jokerLayout, setJokerLayout] = useState<JSX.Element[]>([]);
  const [jokerProgress, setJokerProgress] = useState<Joker[]>([]);
  const [baseJokerProgress, setBaseJokerProgress] = useState<Joker[]>([]); // All jokers unchanged by filters and search

  const updateSticker = (id: number, sticker: Sticker | null) => {
    const jokerIndex = jokerProgress.findIndex((joker) => id === joker.id);
    if (jokerIndex !== -1) {
      // update UI
      jokerProgress[jokerIndex] = {
        ...jokerProgress[jokerIndex],
        sticker: sticker,
      };
      setJokerProgress([...jokerProgress]);

      // update localstorage
      const jokers = localStorage.getItem('jokerData');
      if (jokers !== null) {
        const parsedJokers = JSON.parse(jokers) as Joker[];
        const index = parsedJokers.findIndex((joker) => id === joker.id);
        parsedJokers[index] = {
          ...parsedJokers[index],
          sticker: sticker,
        };
        localStorage.setItem('jokerData', JSON.stringify([...parsedJokers]));
        setBaseJokerProgress([...parsedJokers]);
      }
    }
  };

  const fetchJokers = () => {
    const jokerData = localStorage.getItem('jokerData');
    if (jokerData !== null) {
      setJokerProgress(JSON.parse(jokerData));
      setBaseJokerProgress(JSON.parse(jokerData));
    } else {
      // Load jokers from template if none exist in localstorage
      const jokers = [];
      for (const [key, value] of Object.entries(jokerTemplate)) {
        jokers.push({
          id: parseInt(key),
          ...value,
          uri: value.uri === '' ? `/jokers/${value.name}.png` : value.uri,
        });
      }
      setJokerProgress(jokers);
      setBaseJokerProgress(jokers);
      localStorage.setItem('jokerData', JSON.stringify(jokers));
    }
  };

  const renderJokerProgress = useCallback(async () => {
    const result = jokerProgress.map((joker: Joker) => {
      return <JokerTile {...joker} key={joker.name} />;
    });
    setJokerLayout(result);
  }, [jokerProgress]);

  useEffect(() => {
    fetchJokers();
  }, []);

  useEffect(() => {
    renderJokerProgress();
  }, [jokerProgress, renderJokerProgress]);

  const handleSortBy = (option: SortOptions) => {
    const sortedResult = sortByHelper({ jokerProgress, option });
    setJokerProgress([...sortedResult]);
  };

  const onSearchBarChange = (e: React.FormEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    const searchedJokers = baseJokerProgress.filter(
      (joker) =>
        joker.name.toLowerCase().includes(query) ||
        joker.description.toLowerCase().includes(query),
    );
    setJokerProgress([...searchedJokers]);
  };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.options}>
        <SearchBar onChange={onSearchBarChange} />
        <div>{<SortByDropdown handleSortBy={handleSortBy} />}</div>
        <div className={styles.goldStickerCounter}>
          <GoldStickerCounter jokerProgress={baseJokerProgress} />
        </div>
      </div>
      <UpdateStickerContext.Provider value={updateSticker}>
        <div className={styles.jokerLayout}>{jokerLayout}</div>
      </UpdateStickerContext.Provider>
    </div>
  );
}

export default JokerLayout;
