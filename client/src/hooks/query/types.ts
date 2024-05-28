type UseQueryOptions<T> = {
  fn: () => Promise<T>;
  isEnabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
};

type QueryReducerState<T = unknown> = {
  data: T | null;
  isFetching: boolean;
  hasErrors: boolean;
  error: string | null;
};

type SetDataAction<D> = {
  type: 'SET_DATA';
  payload: D;
};

type SetErrorAction = {
  type: 'SET_ERROR';
  payload: string;
};

type StartFetchingAction = {
  type: 'START_FETCHING';
};

type QueryReducerAction<T> =
  | SetDataAction<T>
  | SetErrorAction
  | StartFetchingAction;

export type { UseQueryOptions, QueryReducerState, QueryReducerAction };
