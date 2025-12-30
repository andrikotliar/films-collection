import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSelectValue } from '~/shared/components/select/helpers';
import { Select, type SelectProps } from '~/shared/components/select/select';
import type { ListOption } from '@films-collection/shared';

export type AsyncSelectProps = {
  optionsLoader: (params: {
    queryParams: {
      q?: string;
      selected?: any[];
    };
  }) => Promise<ListOption<any>[]>;
} & Omit<SelectProps, 'onOptionsSearch' | 'options' | 'isOptionsLoading'>;

const RETRY_ATTEMPTS_COUNT = 1;

export const AsyncSelect = ({ optionsLoader, value, ...props }: AsyncSelectProps) => {
  const [searchString, setSearchString] = useState<string | null>(null);

  const { data: options, isFetching } = useQuery({
    queryKey: [optionsLoader.name, searchString, value] as const,
    queryFn: async ({ queryKey }) => {
      const selectedValues = getSelectValue(queryKey[2]);
      return optionsLoader({
        queryParams: { q: queryKey[1] ?? undefined, selected: selectedValues },
      });
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
