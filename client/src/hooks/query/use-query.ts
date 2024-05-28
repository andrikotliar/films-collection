import { Reducer, useCallback, useEffect, useReducer } from 'react';
import {
  QueryReducerAction,
  QueryReducerState,
  UseQueryOptions,
} from './types';
import { queryReducer } from './reducer';
import { initialQueryState } from './initial-values';

const useQuery = <T>(options: UseQueryOptions<T>) => {
  const { fn, isEnabled = true, onSuccess, onError } = options;

  const [state, dispatch] = useReducer<
    Reducer<QueryReducerState<T>, QueryReducerAction<T>>
  >(queryReducer, initialQueryState);

  const callApi = useCallback(async () => {
    dispatch({ type: 'START_FETCHING' });
    try {
      const response = await fn();

      onSuccess?.(response);

      dispatch({ type: 'SET_DATA', payload: response });
    } catch ({ message }: any) {
      dispatch({ type: 'SET_ERROR', payload: message });

      onError?.(message);
    }
  }, [dispatch]);

  useEffect(() => {
    let isActive = true;

    if (isEnabled && isActive) {
      callApi();
    }

    return () => {
      isActive = false;
    };
  }, [isEnabled]);

  return { ...state, refetch: callApi };
};

export { useQuery };
