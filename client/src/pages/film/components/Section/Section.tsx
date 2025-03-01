import { FC, PropsWithChildren, useState } from 'react';
import styles from './Section.module.css';
import classNames from 'classnames';
import { MinusIcon, PlusIcon } from 'lucide-react';

type SectionProps = PropsWithChildren<{
  title: string;
  isCollapsable?: boolean;
  isCollapsedDefault?: boolean;
  shouldHidePaddings?: boolean;
}>;

export const Section: FC<SectionProps> = ({
  children,
  title,
  isCollapsable = false,
  isCollapsedDefault = false,
  shouldHidePaddings = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    isCollapsable && isCollapsedDefault,
  );

  const handleCollapseSection = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div
      className={classNames(styles.section, {
        [styles.collapsed]: isCollapsed,
        [styles.noInnerPadding]: shouldHidePaddings,
      })}
    >
      <h2 className={styles.title}>
        <span>{title}</span>
        {isCollapsable && (
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
