import styles from './DataLinks.module.css';
import { FC } from 'react';
import { BlockLink, DataArea } from '@/components';
import { LinkGroup } from '@/common';

type DataLinksProps = {
  items: LinkGroup[];
};

const DataLinks: FC<DataLinksProps> = ({ items }) => {
  return (
    <DataArea className={styles.dataLinks}>
      {items.map((item, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.rowTitle}>{item.title}</div>
          <div className={styles.group}>
            {Array.isArray(item.value) ? (
              item.value.map((val) => (
                <BlockLink {...item} value={val} key={val} />
              ))
            ) : (
              <BlockLink {...item} />
            )}
          </div>
        </div>
      ))}
    </DataArea>
  );
};

export { DataLinks };
