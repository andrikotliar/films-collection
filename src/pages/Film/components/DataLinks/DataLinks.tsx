import styles from './DataLinks.module.css';
import { FC } from 'react';
import { LinkGroup } from '@/common';
import { DataLink } from './components';

type Props = {
  items: LinkGroup[];
};

const DataLinks: FC<Props> = ({ items }) => {
  return (
    <div className={styles.dataLinks}>
      {items.map((item, index) => (
        <div className={styles.group} key={index}>
          {Array.isArray(item.value) ? (
            item.value.map((value) => (
              <DataLink {...item} value={value} key={value} />
            ))
          ) : (
            <DataLink {...item} />
          )}
        </div>
      ))}
    </div>
  );
};

export { DataLinks };
