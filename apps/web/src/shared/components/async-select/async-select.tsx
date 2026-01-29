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
} & Omit<SelectProps, 'onOptionsSearch' | 'options'>;

const RETRY_ATTEMPTS_COUNT = 1;

export const AsyncSelect = ({
  optionsLoader,
  value,
  isOptionsLoading,
  ...props
}: AsyncSelectProps) => {
  const [searchString, setSearchString] = useState<string | null>(null);

  const { data: options, isFetching } = useQuery({
    queryKey: [optionsLoader.name, searchString] as const,
    queryFn: async () => {
      const selectedValues = getSelectValue(value);
      return optionsLoader({
        queryParams: { q: searchString ?? '', selected: selectedValues },
      });
    },
    placeholderData: (prev) => prev,
    retry: RETRY_ATTEMPTS_COUNT,
    enabled: !!searchString?.length,
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
