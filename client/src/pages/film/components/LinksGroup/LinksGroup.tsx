import { FC } from 'react';
import { DataLink } from '../DataLink/DataLink';
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
          basePath="/"
          query={{
            [basePath]: [item.id],
          }}
          key={item.id}
        >
          {item.title}
        </DataLink>
      ))}
    </LinksGroupWrapper>
  );
};
