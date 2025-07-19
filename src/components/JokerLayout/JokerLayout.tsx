import { Sticker } from 'types';
import { useState, useEffect, ReactNode } from 'react';
import JokerTile from 'components/JokerTile/JokerTile';
import styles from './JokerLayout.module.css';
import axios from 'axios';

function JokerLayout() {
  const [jokerProgress, setJokerProgress] = useState<ReactNode[]>([]);
  const renderJokerProgress = async () => {
    let jokers: ReactNode[] = [];
    await axios.get('http://localhost:8080/').then(({ data }) => {
      jokers = Object.keys(data).map((key: string) => {
        data[key].uri =
          data[key].uri === ''
            ? `/jokers/${data[key].name}.png`
            : data[key].uri;
        const jokerProps = {
          id: parseInt(key),
          ...data[key],
          sticker: Sticker.Black,
        };
        return <JokerTile {...jokerProps} key={key} />;
      });
    });
    return jokers;
  };

  useEffect(() => {
    async function fetchJokers() {
      const response = await renderJokerProgress();
      setJokerProgress(response);
    }
    fetchJokers();
  }, []);

  return <div className={styles.jokerLayout}>{jokerProgress}</div>;
}

export default JokerLayout;
