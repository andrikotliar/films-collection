import { useState } from 'react';
import { type ListOption } from '~/common';
import { useQuery } from '@tanstack/react-query';
import { Select, type SelectProps } from './select';
import { getValue } from './helpers';

export type AsyncSelectProps = {
  optionsLoader: (
    searchString: string | null,
    selected?: (string | number)[],
  ) => Promise<ListOption<any>[]>;
} & Omit<SelectProps, 'onOptionsSearch' | 'options' | 'isOptionsLoading'>;

const RETRY_ATTEMPTS_COUNT = 1;

export const AsyncSelect = ({ optionsLoader, value, ...props }: AsyncSelectProps) => {
  const [searchString, setSearchString] = useState<string | null>(null);

  const { data: options, isFetching } = useQuery({
    queryKey: [optionsLoader.name, searchString, value] as const,
    queryFn: async ({ queryKey }) => {
      const selectedValues = getValue(queryKey[2]);
      return optionsLoader(queryKey[1], selectedValues);
    },
    placeholderData: (prev) => prev,
    retry: RETRY_ATTEMPTS_COUNT,
  });

  return (
    <Select
      options={options ?? []}
      onOptionsSearch={setSearchString}
      value={value}
      onClear={() => setSearchString(null)}
      isOptionsLoading={isFetching}
      {...props}
    />
  );
};
