import styles from './App.module.css';
import JokerLayout from 'components/JokerLayout/JokerLayout';

// read joker-progress.json
// if doesn't exist, create copy of joker-progress-template.json as joker-progress.json

// read straight from joker-progress.json (requires user to copy template and create file)

// for each joker from file
//  if uri is empty: fill with '../../public/jokers/${jokerName}.png'

// fetch('../store/joker-progress-template.json')
//   .then((response) => response.json())
//   .then((jsonResponse) => console.log(jsonResponse));

function App() {
  return (
    <div className={styles.app}>
      <div className="grid-cols-4 bg-red">
        <JokerLayout />
      </div>
    </div>
  );
}

export default App;
