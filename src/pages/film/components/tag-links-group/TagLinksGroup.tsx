import { FC } from 'react';
import styles from './TagLinksGroup.module.css';
import { TagLink, TagLinkProps } from '../tag-link/TagLink';
import { buildQueryLink } from '@/helpers';

type TagLinksGroupProps = {
  basePath: string;
  items: (string | number)[];
  variant?: TagLinkProps['variant'];
};

const TagLinksGroup: FC<TagLinksGroupProps> = ({
  basePath,
  items,
  variant,
}) => {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export { TagLinksGroup };
