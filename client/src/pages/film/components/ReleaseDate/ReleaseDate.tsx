import { getFormattedDate } from '@/helpers';
import { FC } from 'react';
import { TagLink } from '../TagLink/TagLink';

type ReleaseDateProps = {
  value: string;
};

export const ReleaseDate: FC<ReleaseDateProps> = ({ value }) => {
  const sourceDate = new Date(value);

  const formattedDate = getFormattedDate(value);

  const startDate = `${sourceDate.getFullYear()}-01-01`;
  const endDate = `${sourceDate.getFullYear()}-12-31`;

  return (
    <TagLink basePath="/" variant="gray" query={{ startDate, endDate }}>
      {formattedDate}
    </TagLink>
  );
};
