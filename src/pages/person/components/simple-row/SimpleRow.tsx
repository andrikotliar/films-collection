import { RowWrapper } from '@/pages/person/components/row-wrapper/RowWrapper';
import { ComponentProps, FC } from 'react';

type Props = {
  value: string | number;
} & ComponentProps<typeof RowWrapper>;

const SimpleRow: FC<Props> = ({ value, ...props }) => {
  return <RowWrapper {...props}>{value}</RowWrapper>;
};

export { SimpleRow };
