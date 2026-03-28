import type z from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  api,
  convertImageToWebp,
  Form,
  getInitialDataQueryOptions,
  getObjectsDiff,
  isNewItem,
  LocalStorage,
  titleToFileName,
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
        const transformedPoster = await convertImageToWebp(poster);

        const key = `posters/${titleToFileName(data.title)}`;
        const uploadParams = await api.files.getUploadUrl.exec({
          input: {
            key,
            fileType: 'webp',
          },
        });

        await fetch(uploadParams.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'webp',
          },
          body: transformedPoster,
        });

        poster = key;
      }

      const input = {
        ...data,
        poster,
      };

      if (!isNewItem(values.id)) {
        const diff = getObjectsDiff(values, input);

        if (!diff) {
          return;
        }

        return await api.films.update.exec({
          params: { id: values.id },
          input: diff,
        });
      }

      return await api.films.create.exec({
        input,
      });
    },
    onSuccess: () => {
      LocalStorage.removeItem(`film_${values.id}`);
      navigate({ to: '/console/films' });
    },
    meta: {
      invalidateQueries: [
        {
          queryKey: [api.films.getAdminList.staticKey],
        },
        ...(!isNewItem(values.id)
          ? [
              {
                queryKey: [api.films.getById.staticKey, values.id],
              },
            ]
          : []),
      ],
    },
  });

  const { mutateAsync: createNewEntity } = useMutation({
    mutationFn: async ({ value, type }: CreateNewEntityInput) => {
      switch (type) {
        case 'collections': {
          const result = await api.collections.create.exec({
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
          const result = await api.genres.create.exec({ input: { title: value } });
          return {
            value: result.id,
            label: result.title,
          };
        }
        case 'countries': {
          const result = await api.countries.create.exec({ input: { title: value } });
          return {
            value: result.id,
            label: result.title,
          };
        }
        case 'studios': {
          const result = await api.studios.create.exec({ input: { title: value } });
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
      invalidateQueries: { queryKey: api.initialData.get.staticKey },
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
      <Form.TextEditor name="overview" label="Description" />
      <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
      <AwardsSelect awardOptions={initialOptions.options.awards} />
      <TrailersSelect />
      <ChaptersSelect />
      <Form.Checkbox name="draft" type="checkbox" label="Draft" />
      <FilmValuesWatcher id={values.id} />
    </Form>
  );
};
