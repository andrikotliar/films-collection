import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
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