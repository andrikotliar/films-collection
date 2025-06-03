import { getFormattedDate } from '@/helpers';
import { FC } from 'react';
import { DataLink } from '../data-link/data-link';

type ReleaseDateProps = {
  value: string;
};

export const ReleaseDate: FC<ReleaseDateProps> = ({ value }) => {
  const sourceDate = new Date(value);

  const formattedDate = getFormattedDate(value);

  const startDate = `${sourceDate.getFullYear()}-01-01`;
  const endDate = `${sourceDate.getFullYear()}-12-31`;

  return (
    <DataLink
      basePath="/"
      query={{
        startDate,
        endDate,
      }}
    >
      {formattedDate}
    </DataLink>
  );
};
