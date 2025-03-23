import { FC } from 'react';
import { DataLink, DataLinkProps } from '../DataLink/DataLink';
import { buildQueryLink } from '@/helpers';
import { LinksGroupWrapper } from '../LinksGroupWrapper/LinksGroupWrapper';

type LinksGroupProps = {
  basePath: string;
  items: { id: number; title: string }[];
};

export const LinksGroup: FC<LinksGroupProps> = ({ basePath, items }) => {
  return (
    <LinksGroupWrapper>
      {items.map((item) => (
        <DataLink
          path={buildQueryLink({
            [basePath]: [item.id],
          })}
          key={item.id}
        >
          {item.title}
        </DataLink>
      ))}
    </LinksGroupWrapper>
  );
};
