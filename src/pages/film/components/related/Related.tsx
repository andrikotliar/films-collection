import { useRelated } from '@/pages/film/components/related/hooks';
import { FC } from 'react';

type Props = {
  relatedKey: string;
  filmId: string;
};

const Related: FC<Props> = ({ relatedKey, filmId }) => {
  const data = useRelated(relatedKey, filmId);

  console.log(data);

  return <div>{relatedKey}</div>;
};

export { Related };
