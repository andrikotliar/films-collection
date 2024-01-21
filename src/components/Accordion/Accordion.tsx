import { FC, PropsWithChildren } from 'react';
import { AccordionProvider } from './accordion.context';

type AccordionProps = {
  defaultOpen?: number;
};

const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
  children,
  defaultOpen,
}) => {
  return (
    <AccordionProvider defaultOpen={defaultOpen}>
      <div>{children}</div>
    </AccordionProvider>
  );
};

export { Accordion };
