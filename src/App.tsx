import { repoPath } from './constants';
import styles from './App.module.css';
import JokerLayout from 'components/JokerLayout/JokerLayout';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.heading}>
        <img
          className={styles.icon}
          src={`${repoPath}/completionist-icon.jpg`}
          alt="completionist achievement icon"
        />
        <h1 className={styles.title}>Completionist++ Tracker</h1>
      </div>
      <JokerLayout />
    </div>
  );
}

export default App;
