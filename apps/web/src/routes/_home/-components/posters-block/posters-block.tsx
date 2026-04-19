import { Link } from '@tanstack/react-router';
import { DataSection } from '~/routes/_home/-components/data-section/data-section';
import { getExternalImageUrl, Image } from '~/shared';
import styles from './posters-block.module.css';

type Item = {
  id: number;
  poster: string | null;
};

type PostersBlockProps = {
  items: Item[];
  title: string;
};

export const PostersBlock = ({ items, title }: PostersBlockProps) => {
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
            <Image src={getExternalImageUrl(item.poster)} />
          </Link>
        ))}
      </div>
    </DataSection>
  );
};
