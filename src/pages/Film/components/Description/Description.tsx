import styles from './Description.module.css';
import { FC } from 'react';
import { MediaItem, SeasonType, Summary } from '@/common';
import { Accordion, DataArea, RouterLink } from '@/components';
import { AccordionItem } from '@/components/Accordion/AccordionItem';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';

type Props = {
  description: Summary[];
  media: MediaItem[];
  seasons?: SeasonType[];
};

const Description: FC<Props> = ({ description, seasons }) => {
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
                  <RouterLink to={buildLink('year', seasons[index].year)}>
                    {seasons[index].year}
                  </RouterLink>
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
