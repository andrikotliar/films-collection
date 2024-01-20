import { useAccordionContext } from '@/components/Accordion/accordion.context';
import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

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

  return (
    <div className={className}>
      {title && <button onClick={() => setActiveIndex(index)}>{title}</button>}
      <div
        className={classNames({
          open: isOpen,
        })}
      >
        {isOpen && <div>{children}</div>}
      </div>
    </div>
  );
};

export { AccordionItem };
