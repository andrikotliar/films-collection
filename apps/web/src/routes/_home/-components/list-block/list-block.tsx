import { Section, type SectionAction } from '~/routes/_home/-components/section/section';
import { Button } from '~/shared';
import styles from './list-block.module.css';

type ListItem<T extends Record<string, unknown>> = T & {
  id: number;
  title: string;
};

type RowAction<T extends Record<string, unknown>> = {
  id: string | number;
  action: (item: ListItem<T>) => void | Promise<void>;
  icon: React.ReactNode;
};

type ListBlockProps<T extends Record<string, unknown>> = {
  items: Array<ListItem<T>>;
  title: string;
  getRowDescription: (item: ListItem<T>) => string;
  rowActions?: Array<RowAction<T>>;
  sectionActions?: SectionAction[];
};

export const ListBlock = <T extends Record<string, unknown>>({
  items,
  rowActions,
  title,
  sectionActions,
  getRowDescription,
}: ListBlockProps<T>) => {
  if (!items.length) {
    return null;
  }
  return (
    <Section title={title} actions={sectionActions}>
      <div>
        {items.map((item) => (
          <div key={item.id} className={styles.row}>
            <div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{getRowDescription(item)}</div>
            </div>
            {rowActions && (
              <div className={styles.actions}>
                {rowActions.map((actionItem) => (
                  <Button
                    variant="ghost"
                    onClick={() => actionItem.action(item)}
                    icon={actionItem.icon}
                    key={actionItem.id}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};
