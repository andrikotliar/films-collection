import { SeasonType } from '@/common/types';
import { Option, Select } from '@/components';
import { Dispatch, FC, SetStateAction } from 'react';

import styles from './SeasonSelect.module.css';

type SeasonSelectProps = {
  seasons?: SeasonType[];
  onChange: Dispatch<SetStateAction<number>>;
};

const SeasonSelect: FC<SeasonSelectProps> = ({ seasons, onChange }) => {
  if (!seasons || seasons.length === 1) {
    return null;
  }

  const options = seasons.map((season, index) => ({
    label: season.title,
    value: index,
  }));

  const handleChange = (value: Option['value']) => {
    onChange(value as number);
  };

  return (
    <div className={styles.seasonSelect}>
      <Select options={options} defaultValue={0} onSelect={handleChange} />
    </div>
  );
};

export { SeasonSelect };
