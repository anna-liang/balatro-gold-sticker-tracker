import { Input } from '@headlessui/react';
import styles from './SearchBar.module.css';

function SearchBar({
  onChange,
}: {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Input
        className={styles.searchBar}
        name="searchBar"
        type="text"
        placeholder="Search"
        onKeyUp={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchBar;
