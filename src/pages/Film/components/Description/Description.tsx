import classes from './Description.module.css';
import { FC, useState } from 'react';
import { MediaItem, Summary } from '@/common';
import { Accordion, Scrollable } from '@/components';
import classNames from 'classnames';
import { AccordionItem } from '@/components/Accordion/AccordionItem';

type DescriptionProps = {
  description: Summary[];
  media: MediaItem[];
};

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className={classes.description}>
      <h2 className={classes.header}>Description</h2>
      <Accordion defaultOpen={0}>
        {description.map((item, index) => (
          <AccordionItem index={index} title={item.title} key={index}>
            {item.text}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { Description };
