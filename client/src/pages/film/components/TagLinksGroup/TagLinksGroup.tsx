import { FC } from 'react';
import { TagLink, TagLinkProps } from '../TagLink/TagLink';
import { buildQueryLink } from '@/helpers';
import { LinksGroupWrapper } from '../LinksGroupWrapper/LinksGroupWrapper';

type TagLinksGroupProps = {
  basePath: string;
  items: { id: number; title: string }[];
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
            [basePath]: [item.id],
          })}
          key={item.id}
          variant={variant}
        >
          {item.title}
        </TagLink>
      ))}
    </LinksGroupWrapper>
  );
};
