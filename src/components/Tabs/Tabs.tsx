import { Scrollable } from '@/components/Scrollable';
import styles from './Tabs.module.css';
import { FC, ReactNode, useEffect, useState } from 'react';
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

  return (
    <div className={styles.tabs}>
      <div className={styles.controls}>
        {components.map((component, index) => (
          <button
            type="button"
            onClick={() => setActiveIndex(index)}
            key={component.label}
            className={classNames(styles.tab, {
              [styles.active]: activeIndex === index,
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
