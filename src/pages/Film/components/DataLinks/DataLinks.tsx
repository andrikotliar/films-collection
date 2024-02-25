import styles from './DataLinks.module.css';
import { FC } from 'react';
import { DataArea, DataRow, RowDirection } from '@/components';
import { LinkGroup } from '@/common';
import { DataLink } from './components';

type Props = {
  items: LinkGroup[];
};

const DataLinks: FC<Props> = ({ items }) => {
  return (
    <DataArea className={styles.dataLinks}>
      {items.map((item, index) => (
        <DataRow key={index} title={item.title} direction={RowDirection.ROW}>
          <div className={styles.group}>
            {Array.isArray(item.value) ? (
              item.value.map((value) => (
                <DataLink {...item} value={value} key={value} />
              ))
            ) : (
              <DataLink {...item} />
            )}
          </div>
        </DataRow>
      ))}
    </DataArea>
  );
};

export { DataLinks };
