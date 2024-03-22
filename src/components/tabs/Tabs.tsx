import { FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Scrollable } from '../scrollable/Scrollable';

import styles from './Tabs.module.css';

type Props = {
  components: {
    label: string;
    content: ReactNode;
  }[];
  defaultTabIndex?: number;
};

const Tabs: FC<Props> = ({ components, defaultTabIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultTabIndex);
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    setActiveIndex(defaultTabIndex);
  }, [defaultTabIndex]);

  const handleListOpen = () => {
    setIsListOpen((isOpen) => !isOpen);
  };

  const handlePrevGroup = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;

      if (nextIndex < 0) {
        return components.length - 1;
      }

      return nextIndex;
    });
  };

  const handleNextGroup = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (nextIndex === components.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  const handleGroupSelect = (index: number) => () => {
    setActiveIndex(index);
    setIsListOpen(false);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.controls}>
        <button
          type="button"
          className={classNames(styles.arrow, styles.arrowLeft)}
          onClick={handlePrevGroup}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={handleListOpen}
          className={styles.listControl}
        >
          {isListOpen ? (
            <span className={styles.placeholder}>Select group</span>
          ) : (
            components[activeIndex].label
          )}
        </button>
        <button
          type="button"
          className={classNames(styles.arrow, styles.arrowRight)}
          onClick={handleNextGroup}
        >
          <ChevronRight />
        </button>
        {isListOpen && (
          <div className={styles.groups}>
            {components.map((component, index) => (
              <button
                type="button"
                key={component.label}
                className={classNames(styles.groupLabel, {
                  [styles.selectedGroup]: index === activeIndex,
                })}
                onClick={handleGroupSelect(index)}
              >
                {component.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <Scrollable className={styles.content}>
        {components[activeIndex].content}
      </Scrollable>
    </div>
  );
};

export { Tabs };
