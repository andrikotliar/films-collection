import { FC, PropsWithChildren, useState } from 'react';
import styles from './Section.module.css';
import classNames from 'classnames';
import { MinusIcon, PlusIcon } from 'lucide-react';

type SectionProps = PropsWithChildren<{
  title: string;
  collapsable?: boolean;
  collapsedByDefault?: boolean;
  noInnerPadding?: boolean;
}>;

export const Section: FC<SectionProps> = ({
  children,
  title,
  collapsable = false,
  collapsedByDefault = false,
  noInnerPadding = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsedByDefault);

  const handleCollapseSection = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div
      className={classNames(styles.section, {
        [styles.collapsed]: isCollapsed,
        [styles.noInnerPadding]: noInnerPadding,
      })}
    >
      <h2 className={styles.title}>
        <span>{title}</span>
        {collapsable && (
          <button
            onClick={handleCollapseSection}
            className={styles.collapseButton}
          >
            {isCollapsed ? <PlusIcon /> : <MinusIcon />}
          </button>
        )}
      </h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
