import { QueryReducerAction, QueryReducerState } from './types';

const queryReducer = <T>(
  state: QueryReducerState<T>,
  action: QueryReducerAction<T>,
): QueryReducerState<T> => {
  switch (action.type) {
    case 'START_FETCHING':
      return {
        ...state,
        isFetching: true,
        error: null,
        hasErrors: false,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        data: null,
        hasErrors: true,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export { queryReducer };
