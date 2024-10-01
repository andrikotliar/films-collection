import { FC } from 'react';
import styles from './TagLinksGroup.module.css';
import { TagLink, TagLinkProps } from '../TagLink';
import { buildQueryLink } from '@/helpers';

type TagLinksGroupProps = {
  basePath: string;
  items: (string | number)[];
  variant?: TagLinkProps['variant'];
  titles: any;
};

const TagLinksGroup: FC<TagLinksGroupProps> = ({
  basePath,
  items,
  variant,
  titles,
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
          {titles[item]}
        </TagLink>
      ))}
    </div>
  );
};

export { TagLinksGroup };
