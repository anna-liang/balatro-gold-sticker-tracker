import { JokerProgress } from 'types';
import jokerData from '../../store/joker-progress-template.json';
import JokerTile from 'components/JokerTile/JokerTile';
import styles from './JokerLayout.module.css';

function JokerLayout() {
  const renderJokerProgress = () => {
    const jokerProgress: JokerProgress = jokerData;
    const jokers = Object.keys(jokerProgress).map((key: string) => {
      console.log(key, jokerProgress[key]);
      jokerProgress[key].uri =
        jokerProgress[key].uri === ''
          ? `/jokers/${jokerProgress[key].name}.png`
          : jokerProgress[key].uri;
      const jokerProps = {
        id: parseInt(key),
        ...jokerProgress[key],
      };
      return <JokerTile {...jokerProps} key={key} />;
    });
    return jokers;
  };

  return <div className={styles.jokerLayout}>{renderJokerProgress()}</div>;
}

export default JokerLayout;
