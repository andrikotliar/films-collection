import { Button } from '~/shared';
import styles from './section.module.css';

export type SectionAction = {
  id: string | number;
  icon: React.ReactNode;
  action: VoidFunction;
};

type SectionProps = {
  children: React.ReactNode;
  title: string;
  actions?: SectionAction[];
};

export const Section = ({ children, title, actions }: SectionProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {actions && (
          <div className={styles.actions}>
            {actions.map((item) => (
              <Button variant="ghost" onClick={item.action} key={item.id} icon={item.icon} />
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
