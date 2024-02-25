import { FC, PropsWithChildren } from 'react';
import { AccordionProvider } from './accordion.context';

type Props = {
  defaultOpen?: number;
};

const Accordion: FC<PropsWithChildren<Props>> = ({ children, defaultOpen }) => {
  return (
    <AccordionProvider defaultOpen={defaultOpen}>
      <div>{children}</div>
    </AccordionProvider>
  );
};

export { Accordion };
