import { Link } from '@tanstack/react-router';
import { DataSection } from '~/routes/_home/-components/data-section/data-section';
import { getExternalImageUrl, Image } from '~/shared';
import styles from './posters-block.module.css';

type Item<T extends Record<string, any>> = T & {
  id: number;
  poster: string | null;
};

type PostersBlockProps<T extends Record<string, any>> = {
  items: Item<T>[];
  title: string;
  description?: (item: Item<T>) => string;
};

export const PostersBlock = <T extends Record<string, any>>({
  items,
  title,
  description,
}: PostersBlockProps<T>) => {
  if (!items.length) {
    return null;
  }

  return (
    <DataSection title={title}>
      <div className={styles.wrapper}>
        {items.map((item) => (
          <Link
            to="/films/$id"
            params={{ id: item.id.toString() }}
            key={item.id}
            className={styles.film}
          >
            <div className={styles.film_image}>
              <Image src={getExternalImageUrl(item.poster)} />
            </div>
            <div className={styles.title}>{item.title}</div>
            {typeof description === 'function' && (
              <p className={styles.description}>
                <span>{description(item)}</span>
              </p>
            )}
          </Link>
        ))}
      </div>
    </DataSection>
  );
};
