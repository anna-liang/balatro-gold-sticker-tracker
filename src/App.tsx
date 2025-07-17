import { JokerProgress } from 'types';
import jpData from './store/joker-progress-template.json';
import './App.css';
import JokerTile from 'components/jokerTile';

// read joker-progress.json
// if doesn't exist, create copy of joker-progress-template.json as joker-progress.json

// read straight from joker-progress.json (requires user to copy template and create file)

// for each joker from file
//  if uri is empty: fill with '../../public/jokers/${jokerName}.png'

// fetch('../store/joker-progress-template.json')
//   .then((response) => response.json())
//   .then((jsonResponse) => console.log(jsonResponse));

function App() {
  const renderJokerProgress = () => {
    const jokerProgress: JokerProgress = jpData;
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

  return <div className="App">{renderJokerProgress()}</div>;
}

export default App;
