import { FilmsListResponse } from '@/types';
import { UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';

const FilmsListContext = createContext(
  {} as UseQueryResult<FilmsListResponse, Error>,
);

export { FilmsListContext };
