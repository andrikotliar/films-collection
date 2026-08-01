import { useContext } from 'react';
import { FilterContext } from '~/shared/context';

export const useFilterContext = () => useContext(FilterContext);
