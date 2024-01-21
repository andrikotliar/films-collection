import classes from './Description.module.css';
import { FC, useState } from 'react';
import { MediaItem, SeasonType, SeriesExtension, Summary } from '@/common';
import { Accordion, BubbleLink, DataArea, Modal } from '@/components';
import { AccordionItem } from '@/components/Accordion/AccordionItem';
import { Video } from '@/pages/Film/components/Description/components/Video';
import { PlayIconOutline } from '@/assets/icons';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';
import classNames from 'classnames';

type DescriptionProps = {
  description: Summary[];
  media: MediaItem[];
  seasons?: SeasonType[];
};

const Description: FC<DescriptionProps> = ({ description, media, seasons }) => {
  const [trailerIndex, setTrailerIndex] = useState<number | null>(null);

  return (
    <>
      <DataArea className={classes.wrapper}>
        <div className={classes.header}>Description</div>
        <Accordion defaultOpen={0}>
          {description.map((item, index) => (
            <AccordionItem index={index} title={item.title} key={index}>
              <p>{item.text}</p>
              <div className={classes.metaInfo}>
                <button
                  onClick={() => setTrailerIndex(index)}
                  className={classNames(
                    classes.playButton,
                    classes.detailsItem,
                  )}
                >
                  <PlayIconOutline
                    className={classes.playButtonIcon}
                    color="#006db7"
                  />
                  <span>Play trailer</span>
                </button>
                {seasons && (
                  <div className={classes.seriesDetails}>
                    <div className={classes.detailsItem}>
                      <span>Episodes:</span> {seasons[index].episodesCount}
                    </div>
                    <div className={classes.detailsItem}>
                      <span>Release year: </span>
                      <BubbleLink
                        property="year"
                        value={seasons[index].year}
                        color="primary"
                        className={classes.year}
                      />
                    </div>
                  </div>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </DataArea>
      <Modal
        isOpen={trailerIndex !== null}
        onClose={() => setTrailerIndex(null)}
        contentClassName={classes.video}
      >
        {trailerIndex !== null && <Video path={media[trailerIndex].trailer} />}
      </Modal>
    </>
  );
};

export { Description };
