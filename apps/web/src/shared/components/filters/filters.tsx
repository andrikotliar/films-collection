import z from 'zod';
import styles from './filters.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { type FilterItem, Button } from '~/shared';
import { FilterOptions } from './components';
import { TitleType, TitleStyle } from '@films-collection/shared';

const FiltersSchema = z.object({
  genreIds: z.array(z.coerce.number()),
  countryIds: z.array(z.coerce.number()),
  studioIds: z.array(z.coerce.number()),
  type: z.enum({ ...TitleType, all: 'all' }),
  style: z.enum({ ...TitleStyle, all: 'all' }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  collectionId: z.coerce.number().optional(),
});

type FilterValues = z.infer<typeof FiltersSchema>;

export type FiltersProps = {
  config: FilterItem[];
  defaultValues?: Partial<FilterValues>;
  filtersCount: number;
  onSubmit: (data: FilterValues) => void;
  onReset?: () => void;
};

const defaultValues: FilterValues = {
  genreIds: [],
  countryIds: [],
  studioIds: [],
  type: 'all',
  style: 'all',
  collectionId: -1,
};

export const Filters = ({
  config,
  defaultValues: defaultValuesProp = {},
  onSubmit,
  onReset,
  filtersCount,
}: FiltersProps) => {
  const filtersForm = useForm({
    defaultValues: {
      ...defaultValues,
      ...defaultValuesProp,
    },
    resolver: zodResolver(FiltersSchema),
  });

  const resetForm = () => {
    onReset?.();
    filtersForm.reset(defaultValues);
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
