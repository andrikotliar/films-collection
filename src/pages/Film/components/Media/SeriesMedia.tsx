import classes from './SeriesMedia.module.css';
import { SeriesExtension, Summary } from '@/common';
import { Select } from '@/components';
import { FilmMedia } from '@/pages/Film/components/Media/FilmMedia';
import { FC, useState } from 'react';

type SeriesMediaProps = {
  series: SeriesExtension;
  summarySections: Summary[];
  title: string;
};

const SeriesMedia: FC<SeriesMediaProps> = ({
  series,
  title,
  summarySections,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = summarySections.map((section, index) => ({
    label: section.title || `Season ${index + 1}`,
    value: index,
  }));

  return (
    <FilmMedia
      poster={series.seasons[activeIndex].poster}
      trailer={series.seasons[activeIndex].trailer}
      title={`${title} | Season ${series.seasons[activeIndex].number}`}
    >
      {options.length > 1 && (
        <div className={classes.select}>
          <Select
            options={options}
            onSelect={(option) => setActiveIndex(+option.value)}
            defaultValue={options[0]}
          />
        </div>
      )}
    </FilmMedia>
  );
};

export { SeriesMedia };
