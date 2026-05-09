import type z from 'zod';
import styles from './filters.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, type DefaultValues } from 'react-hook-form';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { type FilterItem, Button } from '~/shared';
import { FilterOptions } from './components';

export type FiltersProps<
  TDefaultValues extends Record<string, unknown>,
  TSchema extends z.ZodType,
> = {
  config: FilterItem<TDefaultValues>[];
  defaultValues: DefaultValues<TDefaultValues>;
  resetValues: TDefaultValues;
  filtersCount: number;
  onSubmit: (data: TDefaultValues) => void;
  onReset?: () => void;
  schema: TSchema;
};

export const Filters = <TDefaultValues extends Record<string, unknown>, TSchema extends z.ZodType>({
  config,
  defaultValues,
  onSubmit,
  onReset,
  filtersCount,
  schema,
  resetValues,
}: FiltersProps<TDefaultValues, TSchema>) => {
  const filtersForm = useForm<TDefaultValues>({
    defaultValues,
    resolver: zodResolver(schema as any),
  });

  const resetForm = () => {
    filtersForm.reset(resetValues);
    onReset?.();
  };

  return (
    <FormProvider {...filtersForm}>
      <form onSubmit={filtersForm.handleSubmit(onSubmit)} className={styles.filters}>
        <div className={styles.filter_groups}>
          {config.map((filter) => (
            <FilterOptions filter={filter} key={filter.title} />
          ))}
        </div>
        <div className={styles.controls}>
          <Button icon={<SearchIcon />} type="submit">
            Search
          </Button>
          {filtersCount > 0 && (
            <Button onClick={resetForm} icon={<RefreshCcwIcon />} variant="secondary">
              Reset
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
