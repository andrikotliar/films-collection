import type z from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  api,
  Form,
  getFileUploadFormData,
  getInitialDataQueryOptions,
  getObjectsDiff,
  isNewItem,
  LocalStorage,
  queryKeys,
} from '~/shared';
import { FilmFormSchema } from '~/routes/console/films_/-schemas';
import {
  AwardsSelect,
  CastAndCrewSelect,
  ChaptersSelect,
  FilmValuesWatcher,
  SeriesExtension,
  TrailersSelect,
} from '~/routes/console/films_/-components/film-form/components';

type FilmFormProps = {
  values: z.infer<typeof FilmFormSchema>;
};

type CreateNewEntityInput = {
  value: string;
  type: 'genres' | 'countries' | 'studios' | 'collections';
};

export const FilmForm = ({ values }: FilmFormProps) => {
  const navigate = useNavigate();
  const { data: initialOptions } = useSuspenseQuery(getInitialDataQueryOptions());

  const { mutateAsync: handleSubmit, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof FilmFormSchema>) => {
      let poster = data.poster;

      if (poster instanceof File) {
        const formData = getFileUploadFormData({
          title: data.title,
          destination: 'posters',
          file: poster,
        });

        const posterData = await api.files.create({ input: formData });

        poster = posterData.url;
      }

      const trailers = data.trailers.map((trailer) => ({
        ...trailer,
        videoId: trailer.videoId.startsWith('http')
          ? new URL(trailer.videoId).searchParams.get('v') ?? ''
          : trailer.videoId,
      }));

      const input = {
        ...data,
        poster,
        trailers,
      };

      if (!isNewItem(values.id)) {
        const diff = getObjectsDiff(values, input);

        if (!diff) {
          return;
        }

        return await api.films.admin.patch({
          params: { id: values.id },
          input: diff,
        });
      }

      return await api.films.admin.create({
        input,
      });
    },
    onSuccess: () => {
      LocalStorage.removeItem(`film_${values.id}`);
      navigate({ to: '/console/films' });
    },
    meta: {
      invalidateQueries: !isNewItem(values.id)
        ? [queryKeys.films.get({ params: { id: values.id } })]
        : undefined,
    },
  });

  const { mutateAsync: createNewEntity } = useMutation({
    mutationFn: async ({ value, type }: CreateNewEntityInput) => {
      switch (type) {
        case 'collections': {
          const result = await api.collections.create({
            input: {
              title: value,
              category: 'GENERAL',
            },
          });
          return {
            value: result.id,
            label: result.title,
          };
        }
        case 'genres': {
          const result = await api.genres.create({ input: { title: value } });
          return {
            value: result.id,
            label: result.title,
          };
        }
        case 'countries': {
          const result = await api.countries.create({ input: { title: value } });
          return {
            value: result.id,
            label: result.title,
          };
        }
        case 'studios': {
          const result = await api.studios.create({ input: { title: value } });
          return {
            value: result.id,
            label: result.title,
          };
        }
        default:
          throw new Error('Unknown type');
      }
    },
    meta: {
      invalidateQueries: [queryKeys.initialData.list()],
    },
  });

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={values}
      schema={FilmFormSchema}
      onReset={(reset) => {
        reset(values);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <Form.CheckboxesGroup
        label="Type"
        name="type"
        options={initialOptions.options.types}
        type="radio"
      />
      <Form.CheckboxesGroup
        label="Styles"
        name="style"
        options={initialOptions.options.styles}
        type="radio"
      />
      <Form.RatingInput name="rating" label="Rating" size={3} />
      <Form.FileInput label="Poster" name="poster" />
      <Form.TextInput name="watchCount" type="number" label="Watch count" min="0" />
      <SeriesExtension />
      <Form.Select
        label="Genres"
        name="genres"
        options={initialOptions.options.genres}
        isMulti
        onCreateOption={(value) => createNewEntity({ value, type: 'genres' })}
      />
      <Form.Select
        label="Countries"
        name="countries"
        options={initialOptions.options.countries}
        onCreateOption={(value) => createNewEntity({ value, type: 'countries' })}
        isMulti
      />
      <Form.Select
        label="Studios"
        name="studios"
        options={initialOptions.options.studios}
        onCreateOption={(value) => createNewEntity({ value, type: 'studios' })}
        isMulti
      />
      <Form.Select
        label="Collections"
        name="collections"
        options={initialOptions.options.collections}
        onCreateOption={(value) => createNewEntity({ value, type: 'collections' })}
        isMulti
      />
      <Form.TextInput name="duration" type="number" label="Runtime (min)" min="0" />
      <Form.DatePicker name="releaseDate" label="Release Date" />
      <Form.TextInput name="budget" label="Budget" type="number" min="0" />
      <Form.TextInput name="boxOffice" label="Box Office" type="number" min="0" />
      <Form.TextEditor name="description" label="Description" />
      <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
      <AwardsSelect awardOptions={initialOptions.options.awards} />
      <TrailersSelect />
      <ChaptersSelect />
      <Form.Checkbox name="isDraft" type="checkbox" label="Draft" />
      <FilmValuesWatcher id={values.id} />
    </Form>
  );
};
