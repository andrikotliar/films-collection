import classes from './DataLinks.module.css';
import { FC } from 'react';
import {
  DataLink,
  DataLinkType,
} from '@/pages/Film/components/DataLinks/components';

type DataLinksProps = {
  items: DataLinkType[];
};

const DataLinks: FC<DataLinksProps> = ({ items }) => {
  return (
    <div className={classes.dataLinks}>
      {items.map((item, index) =>
        Array.isArray(item.value) ? (
          <div className={classes.group} key={index}>
            {item.value.map(val => (
              <DataLink {...item} value={val} key={val} />
            ))}
          </div>
        ) : (
          <DataLink {...item} key={item.value} />
        ),
      )}
    </div>
  );
};

export { DataLinks };
