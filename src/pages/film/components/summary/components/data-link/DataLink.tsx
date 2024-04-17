import { DataLinkType } from '@/common/types';
import { FC } from 'react';
import { buildQueryLink } from '@/helpers';
import { RouterLink } from '@/components';
import { DataContent } from '../data-content/DataContent';

type Props = DataLinkType;

const DataLink: FC<Props> = ({ property, value, suffix }) => {
  return (
    <RouterLink to={buildQueryLink(property, value)}>
      <DataContent value={value} suffix={suffix} />
    </RouterLink>
  );
};

export { DataLink };
