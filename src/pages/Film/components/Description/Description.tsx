import classes from './Description.module.css';
import { FC } from 'react';
import { Summary } from '@/common';
import { Scrollable } from '@/components';

type DescriptionProps = {
  description: Summary[];
};

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className={classes.description}>
      <h2 className={classes.header}>Description</h2>
      <Scrollable className={classes.content}>
        {description.map((section, index) => (
          <div className={classes.section} key={index}>
            {section.title && <h3>{section.title}</h3>}
            <p>{section.text}</p>
          </div>
        ))}
      </Scrollable>
    </div>
  );
};

export { Description };
