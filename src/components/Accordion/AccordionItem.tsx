import { ExpandIcon } from '@/assets/icons';
import { useAccordionContext } from '@/components/Accordion/accordion.context';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import classes from './AccordionItem.module.css';

type ClassNames = {
  wrapper: string;
  button: string;
  body: string;
  title: string;
};

type AccordionItemProps = {
  index: number;
  title?: string;
  styles?: Partial<ClassNames>;
};

const AccordionItem: FC<PropsWithChildren<AccordionItemProps>> = ({
  children,
  index,
  title,
  styles,
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
    <div className={styles?.wrapper}>
      {title && (
        <button
          className={classNames(classes.button, styles?.button)}
          onClick={() => handleActiveIndex(index)}
        >
          <span className={styles?.title}>{title}</span>
          <ExpandIcon
            className={classNames(classes.expandIcon, {
              [classes.expandIconOpen]: isOpen,
            })}
          />
        </button>
      )}
      {isOpen && (
        <div className={classNames(classes.body, styles?.body)}>{children}</div>
      )}
    </div>
  );
};

export { AccordionItem };
