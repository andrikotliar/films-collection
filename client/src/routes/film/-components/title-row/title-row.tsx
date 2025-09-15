import { WatchCounterBadge } from '@/routes/film/-components/watch-counter-badge';
import { Rating, Title } from './components';
import { type FilmDetails } from '@/common';

type TitleRowProps = {
  data: FilmDetails;
};

export const TitleRow = ({ data }: TitleRowProps) => {
  return (
    <div className="flex gap-2.5 flex-col md:flex-row md:gap-10 justify-between items-start">
      <Title>{data.title}</Title>
      <div className="flex gap-2.5 absolute top-18.5 right-7.5 md:top-16 md:right-5 xl:static">
        {data.watchCounter && <WatchCounterBadge counters={data.watchCounter} />}
        <Rating value={data.rating} />
      </div>
    </div>
  );
};
