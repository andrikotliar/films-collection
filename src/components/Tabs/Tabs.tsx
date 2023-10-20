import { Scrollable } from '@/components/Scrollable';
import classes from './Tabs.module.css';
import { FC, ReactNode, useState } from 'react';
import classNames from 'classnames';

type TabsProps = {
  components: {
    label: string;
    content: ReactNode;
  }[];
  defaultTabIndex?: number;
};

const Tabs: FC<TabsProps> = ({ components, defaultTabIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultTabIndex);

  return (
    <div className={classes.tabs}>
      <div className={classes.controls}>
        {components.map((component, index) => (
          <button
            type="button"
            onClick={() => setActiveIndex(index)}
            key={component.label}
            className={classNames(classes.tab, {
              [classes.active]: activeIndex === index,
            })}
          >
            {component.label}
          </button>
        ))}
      </div>
      <Scrollable className={classes.content}>
        {components[activeIndex].content}
      </Scrollable>
    </div>
  );
};

export { Tabs };
