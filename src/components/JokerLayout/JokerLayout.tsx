import { useState, useEffect, useCallback, JSX } from 'react';
import JokerTile from 'components/JokerTile/JokerTile';
import styles from './JokerLayout.module.css';
import axios from 'axios';
import { Joker } from 'types';

function JokerLayout() {
  const [jokerLayout, setJokerLayout] = useState<JSX.Element[]>([]);
  const [jokerProgress, setJokerProgress] = useState<Joker[]>([]);

  const fetchJokers = async () => {
    const response = await axios
      .get('http://localhost:8080/')
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
    async function fetchJokersCaller() {
      await fetchJokers();
    }
    fetchJokersCaller();
  }, []);

  useEffect(() => {
    renderJokerProgress();
  }, [jokerProgress, renderJokerProgress]);

  return (
    <div>
      <div className={styles.jokerLayout}>{jokerLayout}</div>
    </div>
  );
}

export default JokerLayout;
