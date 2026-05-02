import { Link } from '@tanstack/react-router';
import styles from './counts-block.module.css';
import { ChevronRightIcon } from 'lucide-react';
import { Section } from '~/routes/_home/-components/section/section';

type Item<T extends Record<string, any>> = T & {
  title: string;
  count: string;
};

type CountsBlockProps<T extends Record<string, any>> = {
  items: Item<T>[];
  title: string;
  getSearch: (item: T) => Record<string, any>;
};

export const CountsBlock = <T extends Record<string, any>>({
  items,
  title,
  getSearch,
}: CountsBlockProps<T>) => {
  return (
    <Section title={title}>
      <div className={styles.items}>
        {items.map((item) => (
          <Link key={item.id} to="/films" search={getSearch(item)} className={styles.link}>
            <span className={styles.link_title}>{item.title}</span>
            <div className={styles.right_column}>
              <span className={styles.link_count}>{item.count}</span>
              <ChevronRightIcon />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};
