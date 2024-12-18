import { FC } from 'react';
import { TagLink, TagLinkProps } from '../TagLink/TagLink';
import { buildQueryLink } from '@/helpers';
import { LinksGroupWrapper } from '../LinksGroupWrapper/LinksGroupWrapper';

type TagLinksGroupProps = {
  basePath: string;
  items: (string | number)[];
  variant?: TagLinkProps['variant'];
};

export const TagLinksGroup: FC<TagLinksGroupProps> = ({
  basePath,
  items,
  variant,
}) => {
  return (
    <LinksGroupWrapper>
      {items.map((item) => (
        <TagLink
          path={buildQueryLink({
            [basePath]: item,
          })}
          key={item}
          variant={variant}
        >
          {item}
        </TagLink>
      ))}
    </LinksGroupWrapper>
  );
};
