import styles from './Description.module.css';
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
    <DataArea className={styles.wrapper}>
      <div className={styles.header}>Description</div>
      <Accordion defaultOpen={0}>
        {description.map((item, index) => (
          <AccordionItem index={index} title={item.title} key={index}>
            <p>{item.text}</p>
            {seasons && (
              <div className={styles.seriesDetails}>
                <div className={styles.detailsItem}>
                  <span>Episodes:</span> {seasons[index].episodesCount}
                </div>
                <div className={styles.detailsItem}>
                  <span>Release year: </span>
                  <BlockLink
                    property="year"
                    value={seasons[index].year}
                    variant="ocean"
                    className={styles.year}
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
