import { FC } from 'react';
import { TagLink, TagLinkProps } from '../TagLink/TagLink';
import { buildQueryLink } from '@/helpers';
import { LinksGroupWrapper } from '../LinksGroupWrapper/LinksGroupWrapper';

type TagLinksGroupProps = {
  basePath: string;
  items: (string | number)[];
  variant?: TagLinkProps['variant'];
  titles?: any;
};

const TagLinksGroup: FC<TagLinksGroupProps> = ({
  basePath,
  items,
  variant,
  titles,
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
          {titles[item]}
        </TagLink>
      ))}
    </LinksGroupWrapper>
  );
};

export { TagLinksGroup };
