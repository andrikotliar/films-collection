import z from 'zod';
import styles from './filters.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RefreshCcwIcon, SearchIcon } from 'lucide-react';
import { getRouteApi } from '@tanstack/react-router';
import { countObjectKeys, filterValues, type FilterItem, Button } from '~/shared';
import { FilterOptions } from '~/routes/_home/-components/filters/components';
import { useSidebar } from '~/routes/_home/-context';

type FiltersProps = {
  config: FilterItem[];
};

const FiltersSchema = z.object({
  genreIds: z.array(z.coerce.number()),
  countryIds: z.array(z.coerce.number()),
  studioIds: z.array(z.coerce.number()),
  type: z.string().nullable(),
  style: z.string().nullable(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  collectionId: z.coerce.number().optional(),
});

const defaultValues: z.infer<typeof FiltersSchema> = {
  genreIds: [],
  countryIds: [],
  studioIds: [],
  type: 'all',
  style: 'all',
  collectionId: -1,
};

const routeApi = getRouteApi('/_home/');

export const Filters = ({ config }: FiltersProps) => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const { hideFilter } = useSidebar();

  const filtersCount = countObjectKeys(routeSearch, ['pageIndex']);

  const filtersForm = useForm({
    defaultValues: {
      ...defaultValues,
      ...routeSearch,
    },
    resolver: zodResolver(FiltersSchema),
  });

  const submitFilter = (data: any) => {
    const filledOptions = filterValues(data);
    navigate({
      search: filledOptions,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    hideFilter();
  };

  const handleReset = () => {
    navigate({
      to: '/',
    });
    filtersForm.reset(defaultValues);
    window.scrollTo(0, 0);
    hideFilter();
  };

  return (
    <FormProvider {...filtersForm}>
      <form onSubmit={filtersForm.handleSubmit(submitFilter)} className={styles.filters}>
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
            <Button onClick={handleReset} icon={<RefreshCcwIcon />} variant="secondary">
              Reset
            </Button>
          )}
          <div className={styles.close_button_wrapper}>
            <Button type="button" onClick={hideFilter} variant="light">
              Close
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
