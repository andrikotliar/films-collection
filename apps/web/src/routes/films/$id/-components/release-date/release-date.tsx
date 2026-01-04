import { getFormattedDate } from '~/shared';
import { DataLink } from '../data-link/data-link';

type ReleaseDateProps = {
  value: string;
};

export const ReleaseDate = ({ value }: ReleaseDateProps) => {
  const formattedDate = getFormattedDate(value);

  const dateOnly = value.split('T')[0];

  return (
    <DataLink
      basePath="/"
      query={{
        startDate: dateOnly,
        endDate: dateOnly,
      }}
    >
      {formattedDate}
    </DataLink>
  );
};
