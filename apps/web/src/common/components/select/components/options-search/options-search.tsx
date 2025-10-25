import styles from './styles.module.css';
import { ChangeEventHandler } from 'react';

type OptionsSearchProps = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

export const OptionsSearch = ({ value, onSearch }: OptionsSearchProps) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        value={value}
        onChange={onSearch}
        name="search-option"
        className={styles.search}
        placeholder="Search options..."
      />
    </div>
  );
};
