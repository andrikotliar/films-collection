import classes from './DataLinks.module.css';
import { FC } from 'react';
import { BubbleLink, DataArea } from '@/components';
import { LinkGroup } from '@/common';

type DataLinksProps = {
  items: LinkGroup[];
};

const DataLinks: FC<DataLinksProps> = ({ items }) => {
  return (
    <DataArea className={classes.dataLinks}>
      {items.map((item, index) => (
        <div key={index} className={classes.row}>
          <div className={classes.rowTitle}>{item.title}</div>
          <div className={classes.group}>
            {Array.isArray(item.value) ? (
              item.value.map((val) => (
                <BubbleLink {...item} value={val} key={val} />
              ))
            ) : (
              <BubbleLink {...item} />
            )}
          </div>
        </div>
      ))}
    </DataArea>
  );
};

export { DataLinks };
