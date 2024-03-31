import { ChevronDownIcon } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

import styles from './CollapsibleSection.module.css';
import classNames from 'classnames';

type Props = {
  title: string;
};

const CollapsibleSection: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseSection = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  return (
    <div>
      <button className={styles.headerButton} onClick={handleCollapseSection}>
        <span>{title}</span>
        <ChevronDownIcon
          className={classNames(styles.chevron, {
            [styles.rotatedChevron]: isCollapsed,
          })}
        />
      </button>
      <div
        className={classNames({
          [styles.hidden]: isCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { CollapsibleSection };
