import { DataLinkType } from '@/common';
import { FC } from 'react';
import { buildLink } from '@/helpers';
import { RouterLink } from '@/components';

type Props = DataLinkType;

const DataLink: FC<Props> = ({ property, value, suffix }) => {
  return (
    <RouterLink to={buildLink(property, value)}>
      {value} {suffix}
    </RouterLink>
  );
};

export { DataLink };
