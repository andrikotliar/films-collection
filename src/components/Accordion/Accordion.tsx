import { FC, PropsWithChildren } from 'react';
import { AccordionProvider } from './accordion.context';

type AccordionProps = {
  defaultOpen?: number;
  className?: string;
};

const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
  children,
  defaultOpen,
  className,
}) => {
  return (
    <AccordionProvider defaultOpen={defaultOpen}>
      <div className={className}>{children}</div>
    </AccordionProvider>
  );
};

export { Accordion };
