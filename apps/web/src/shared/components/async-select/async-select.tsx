import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSelectValue } from '~/shared/components/select/helpers';
import { Select, type SelectProps } from '~/shared/components/select/select';
import type { ListOption } from '@films-collection/shared';

type QueryParams = {
  q?: string;
  selected?: any[];
};

export type AsyncSelectProps<T extends ListOption<any>> = {
  optionsLoader: (params: { queryParams: QueryParams }) => Promise<T[]>;
  queryKey: Array<unknown>;
} & Omit<SelectProps<T>, 'onOptionsSearch' | 'options'>;

const RETRY_ATTEMPTS_COUNT = 1;

export const AsyncSelect = <T extends ListOption<any>>({
  optionsLoader,
  value,
  isOptionsLoading,
  queryKey,
  ...props
}: AsyncSelectProps<T>) => {
  const [searchString, setSearchString] = useState<string | null>(null);

  const { data: options, isFetching } = useQuery({
    queryKey: [queryKey, searchString] as const,
    queryFn: async () => {
      const selectedValues = value ? getSelectValue(value) : [];

      const queryParams: QueryParams = {
        selected: selectedValues,
      };

      if (searchString) {
        queryParams.q = searchString;
      }

      return optionsLoader({
        queryParams,
      });
    },
    retry: RETRY_ATTEMPTS_COUNT,
  });

  return (
    <Select
      options={options ?? []}
      onOptionsSearch={setSearchString}
      value={value}
      onClear={() => setSearchString(null)}
      isOptionsLoading={isFetching || isOptionsLoading}
      {...props}
    />
  );
};
