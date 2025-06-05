import styles from './options-search.module.css';
import { ChangeEventHandler, FC } from 'react';

type OptionsSearchProps = {
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

export const OptionsSearch: FC<OptionsSearchProps> = ({ onSearch }) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        onChange={onSearch}
        name="search-option"
        className={styles.search}
        placeholder="Search options..."
      />
    </div>
  );
};
