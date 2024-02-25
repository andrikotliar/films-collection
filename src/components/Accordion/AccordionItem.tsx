import { useAccordionContext } from '@/components/Accordion/accordion.context';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './AccordionItem.module.css';
import { ChevronDown } from 'lucide-react';

type Props = {
  index: number;
  title?: string;
  className?: string;
};

const AccordionItem: FC<PropsWithChildren<Props>> = ({
  children,
  index,
  title,
  className,
}) => {
  const { activeIndex, setActiveIndex } = useAccordionContext();
  const isOpen = activeIndex === index;

  const handleActiveIndex = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(undefined);
      return;
    }

    setActiveIndex(index);
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      {title && (
        <button
          className={classNames(styles.button, {
            [styles.buttonOpen]: isOpen,
          })}
          onClick={() => handleActiveIndex(index)}
        >
          <span>{title}</span>
          <ChevronDown className={styles.expandIcon} />
        </button>
      )}
      {isOpen && <div className={styles.body}>{children}</div>}
    </div>
  );
};

export { AccordionItem };
