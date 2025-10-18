import { getFormattedDate } from '~/common';
import { DataLink } from '../data-link/data-link';

type ReleaseDateProps = {
  value: string;
};

export const ReleaseDate = ({ value }: ReleaseDateProps) => {
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
