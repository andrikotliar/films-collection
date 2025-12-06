import styles from './options-search.module.css';
import { type ChangeEventHandler } from 'react';

type OptionsSearchProps = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

export const OptionsSearch = ({ value, onSearch }: OptionsSearchProps) => {
  return (
    <div className={styles.search_wrapper}>
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
