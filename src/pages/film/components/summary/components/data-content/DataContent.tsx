import { DataLinkType } from '@/common/types';
import { FC } from 'react';

type DataContentProps = Pick<DataLinkType, 'value' | 'suffix'>;

const DataContent: FC<DataContentProps> = ({ value, suffix }) => {
  return (
    <span>
      {value} {suffix}
    </span>
  );
};

export { DataContent };
