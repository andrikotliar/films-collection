import { useAccordionContext } from '@/components/Accordion/accordion.context';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import classes from './AccordionItem.module.css';
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
  index: number;
  title?: string;
  className?: string;
};

const AccordionItem: FC<PropsWithChildren<AccordionItemProps>> = ({
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
    <div className={classNames(classes.wrapper, className)}>
      {title && (
        <button
          className={classNames(classes.button, {
            [classes.buttonOpen]: isOpen,
          })}
          onClick={() => handleActiveIndex(index)}
        >
          <span>{title}</span>
          <ChevronDown className={classes.expandIcon} />
        </button>
      )}
      {isOpen && <div className={classes.body}>{children}</div>}
    </div>
  );
};

export { AccordionItem };
