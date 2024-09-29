import { buildQueryLink, getFormattedDate } from '@/helpers';
import { FC } from 'react';
import { TagLink } from '../tag-link/TagLink';

type ReleaseDateProps = {
  value: string;
};

const ReleaseDate: FC<ReleaseDateProps> = ({ value }) => {
  const releaseDate = new Date(value);
  const formattedDate = getFormattedDate(releaseDate);

  const startDate = `${releaseDate.getFullYear()}-01-01`;
  const endDate = `${releaseDate.getFullYear()}-12-31`;

  const path = buildQueryLink({
    startDate,
    endDate,
  });

  return (
    <TagLink path={path} variant="blue">
      {formattedDate}
    </TagLink>
  );
};

export { ReleaseDate };
