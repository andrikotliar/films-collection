import { getFormattedDate } from '~/shared';
import { DataLink } from '../data-link/data-link';

type ReleaseDateProps = {
  value: string | null;
};

export const ReleaseDate = ({ value }: ReleaseDateProps) => {
  if (!value) {
    return 'N/A';
  }

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
