import { FC } from 'react';
import { TagLink, TagLinkProps } from '../TagLink/TagLink';
import { LinksGroupWrapper } from '../LinksGroupWrapper/LinksGroupWrapper';
import { FileRoutesByTo } from '@/routeTree.gen';

type TagLinksGroupProps = {
  route: keyof FileRoutesByTo;
  queryKey: string;
  items: (string | number)[];
  variant?: TagLinkProps['variant'];
};

export const TagLinksGroup: FC<TagLinksGroupProps> = ({
  route,
  queryKey,
  items,
  variant,
}) => {
  return (
    <LinksGroupWrapper>
      {items.map((item) => (
        <TagLink
          path={route}
          searchParams={{
            [queryKey]: [item],
          }}
          key={item}
          variant={variant}
        >
          {item}
        </TagLink>
      ))}
    </LinksGroupWrapper>
  );
};
