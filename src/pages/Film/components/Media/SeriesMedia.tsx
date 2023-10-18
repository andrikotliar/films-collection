import classes from './SeriesMedia.module.css';
import { SeriesExtension } from '@/common';
import { Select } from '@/components';
import { FilmMedia } from '@/pages/Film/components/Media/FilmMedia';
import { FC, useState } from 'react';

type SeriesMediaProps = {
  series: SeriesExtension;
  title: string;
};

const SeriesMedia: FC<SeriesMediaProps> = ({ series, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = series.seasons.map((season, index) => ({
    label: season.title,
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
          />
        </div>
      )}
    </FilmMedia>
  );
};

export { SeriesMedia };
