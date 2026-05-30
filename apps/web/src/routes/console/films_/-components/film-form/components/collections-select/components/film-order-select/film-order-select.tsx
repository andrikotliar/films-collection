import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { FieldError, Form, getFilmsByCollectionQueryOptions, Loader } from '~/shared';

type FilmOrderSelectProps = {
  name: string;
  currentCollection: z.infer<typeof FilmFormSchema>['collections'][number];
};

export const FilmOrderSelect = ({ name, currentCollection }: FilmOrderSelectProps) => {
  const { id } = useParams({ from: '/console/films_/$id' });

  const { data, isLoading } = useQuery(
    getFilmsByCollectionQueryOptions(currentCollection.collectionId),
  );

  if (isLoading) {
    return <Loader size={25} />;
  }

  if (!data) {
    return <FieldError error="Selected collection doesn't have films" />;
  }

  return <Form.OrderSelect name={name} list={data} currentId={Number(id)} />;
};
