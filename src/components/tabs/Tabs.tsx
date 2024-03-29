import { FC, ReactNode, useEffect, useState } from 'react';
import { Scrollable } from '../scrollable/Scrollable';

import styles from './Tabs.module.css';
import classNames from 'classnames';

type Props = {
  components: {
    label: string;
    content: ReactNode;
  }[];
  defaultTabIndex?: number;
};

const Tabs: FC<Props> = ({ components, defaultTabIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultTabIndex);

  useEffect(() => {
    setActiveIndex(defaultTabIndex);
  }, [defaultTabIndex]);

  const handleSelectTab = (index: number) => () => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.controls}>
        {components.map((component, index) => (
          <button
            onClick={handleSelectTab(index)}
            key={component.label}
            className={classNames(styles.tab, {
              [styles.active]: index === activeIndex
            })}
          >
            {component.label}
          </button>
        ))}
      </div>
      <Scrollable className={styles.content}>
        {components[activeIndex].content}
      </Scrollable>
    </div>
  );
};

export { Tabs };
