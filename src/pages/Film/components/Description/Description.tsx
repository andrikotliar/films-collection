import classes from './Description.module.css';
import { FC } from 'react';
import { MediaItem, SeasonType, Summary } from '@/common';
import { Accordion, BlockLink, DataArea } from '@/components';
import { AccordionItem } from '@/components/Accordion/AccordionItem';

type DescriptionProps = {
  description: Summary[];
  media: MediaItem[];
  seasons?: SeasonType[];
};

const Description: FC<DescriptionProps> = ({ description, seasons }) => {
  return (
    <DataArea className={classes.wrapper}>
      <div className={classes.header}>Description</div>
      <Accordion defaultOpen={0}>
        {description.map((item, index) => (
          <AccordionItem index={index} title={item.title} key={index}>
            <p>{item.text}</p>
            {seasons && (
              <div className={classes.seriesDetails}>
                <div className={classes.detailsItem}>
                  <span>Episodes:</span> {seasons[index].episodesCount}
                </div>
                <div className={classes.detailsItem}>
                  <span>Release year: </span>
                  <BlockLink
                    property="year"
                    value={seasons[index].year}
                    variant="ocean"
                    className={classes.year}
                  />
                </div>
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </DataArea>
  );
};

export { Description };
