import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { FieldError, Form, Loader } from '~/shared';

export type DataParams = {
  imageUrl: string | null;
  id: number;
  order: number;
};

export type ItemOrderSelectProps<T extends DataParams> = {
  name: string;
  queryOptions: UseQueryOptions<T[] | undefined, Error, T[] | undefined, any>;
};

export const ItemOrderSelect = <T extends DataParams>({
  name,
  queryOptions,
}: ItemOrderSelectProps<T>) => {
  const { id } = useParams({ from: '/console/films_/$id' });

  const { data, isLoading } = useQuery(queryOptions);

  if (isLoading) {
    return <Loader size={25} />;
  }

  if (!data) {
    return <FieldError error="Selected collection doesn't have films" />;
  }

  return <Form.OrderSelect name={name} list={data} currentId={Number(id)} />;
};
