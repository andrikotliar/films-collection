import { MOBILE_VIEW_BREAKPOINT_PX } from '@/common';
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type AppContextType = {
  isFilterOpen: boolean;
  filtersCount: number;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  updateFiltersCount: (count: number) => void;
};

const AppContext = createContext({} as AppContextType);

const useAppContext = () => useContext(AppContext);

const AppProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  const updateFiltersCount = (count: number) => {
    if (
      document.documentElement.clientWidth <=
      MOBILE_VIEW_BREAKPOINT_PX
    ) {
      setFiltersCount(count);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        filtersCount,
        updateFiltersCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
