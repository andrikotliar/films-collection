import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

type AppContextType = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;