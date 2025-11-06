import { getFormattedDate } from '~/lib';
import { DataLink } from '../data-link/data-link';

type Props = {
  value: string;
};

export const ReleaseDate = ({ value }: Props) => {
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
