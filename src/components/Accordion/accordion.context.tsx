import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type ContextValue = {
  activeIndex?: number;
  setActiveIndex: Dispatch<SetStateAction<number | undefined>>;
};

type ProviderProps = {
  defaultOpen?: number;
};

const AccordionContext = createContext({} as ContextValue);
const useAccordionContext = () => useContext(AccordionContext);

const AccordionProvider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  defaultOpen,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultOpen);

  const value = {
    activeIndex,
    setActiveIndex,
  };

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

export { AccordionProvider, useAccordionContext };