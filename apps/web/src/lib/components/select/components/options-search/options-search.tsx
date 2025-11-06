import styles from './styles.module.css';
import { type ChangeEventHandler } from 'react';

type Props = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

export const OptionsSearch = ({ value, onSearch }: Props) => {
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
