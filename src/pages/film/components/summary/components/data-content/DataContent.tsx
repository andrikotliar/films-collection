import { DataLinkType } from '@/common/types';
import { FC } from 'react';

type Props = Pick<DataLinkType, 'value' | 'suffix'>;

const DataContent: FC<Props> = ({ value, suffix }) => {
  return (
    <span>
      {value} {suffix}
    </span>
  );
};

export { DataContent };
