import { Rating, Title } from './components';
import { type FilmDetails } from '@/common';

type TitleRowProps = {
  data: FilmDetails;
};

export const TitleRow = ({ data }: TitleRowProps) => {
  return (
    <div className="flex gap-2.5 flex-col md:flex-row md:gap-10 justify-between items-start">
      <Title>{data.title}</Title>
      <Rating value={data.rating} />
    </div>
  );
};
