import type z from 'zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  api,
  convertImageToWebp,
  Form,
  getInitialDataQueryOptions,
  getObjectsDiff,
  isNewItem,
  Panel,
  queryKey,
  titleToFileName,
  useSearchContext,
} from '~/shared';
import {
  AwardsSelect,
  CastAndCrewSelect,
  Drafts,
  FilmValuesWatcher,
  MoneyInput,
  SeriesExtension,
  TrailersSelect,
  DescriptionEditor,
  CollectionsSelect,
} from '~/routes/console/films_/-components/film-form/components';
import { useState } from 'react';
import type { FilmDraftResponse } from '@films-collection/shared';
import { useNavigate } from '@tanstack/react-router';
import { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';

type FilmFormProps = {
  values: z.infer<typeof FilmFormSchema>;
};

type CreateNewEntityInput = {
  value: string;
  type: 'genres' | 'countries' | 'studios';
};

export const FilmForm = ({ values }: FilmFormProps) => {
  const { data: initialOptions } = useSuspenseQuery(getInitialDataQueryOptions());
  const [selectedDraft, setSelectedDraft] = useState<FilmDraftResponse | null>(null);
  const navigate = useNavigate();
  const { getSearchValue } = useSearchContext();

  const { isPending, mutateAsync: handleSubmit } = useMutation({
    mutationFn: async (data: z.infer<typeof FilmFormSchema>) => {
      let poster = data.poster;

      if (poster instanceof File) {
        const transformedPoster = await convertImageToWebp(poster);

        const key = `posters/${titleToFileName(data.title)}`;
        const uploadParams = await api.files.getUploadUrl({
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

      const today = Date.now();
      const releaseDateMs = data.releaseDate ? new Date(data.releaseDate).getTime() : 0;

      const isDraft = releaseDateMs > today || data.draft;

      const input = {
        ...data,
        poster,
        draft: isDraft,
      };

      if (!isNewItem(values.id)) {
        const diff = getObjectsDiff(values, input);

        if (!diff) {
          return;
        }

        return await api.films.update({
          params: { id: values.id },
          input: diff,
        });
      }

      return await api.films.create({
        input: {
          ...input,
          tempDraftId: selectedDraft?.id,
        },
      });
    },
    onSuccess: () => {
      const searchParams = getSearchValue('/console/films');
      navigate({ to: '/console/films', search: searchParams });
    },
    meta: {
      invalidateQueries: [
        {
          queryKey: [queryKey('films.getAdminList')],
        },
        ...(!isNewItem(values.id)
          ? [
              {
                queryKey: [queryKey('films.getById'), values.id],
              },
              {
                queryKey: [queryKey('films.getEditableFilm'), values.id],
              },
            ]
          : []),
      ],
    },
  });

  const { mutateAsync: createNewEntity } = useMutation({
    mutationFn: async ({ value, type }: CreateNewEntityInput) => {
      switch (type) {
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
      invalidateQueries: { queryKey: queryKey('initialData.get') },
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
      islandActions
    >
      <Drafts onSelectDraft={setSelectedDraft} />
      <Panel isFlexContainer>
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
        <TrailersSelect />
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
        <CollectionsSelect options={initialOptions.options.collections} />
        <Form.TextInput name="duration" type="number" label="Runtime (min)" min="0" />
        <Form.DatePicker name="releaseDate" label="Release Date" />
        <MoneyInput name="budget" label="Budget" />
        <MoneyInput name="boxOffice" label="Box Office" />
        <DescriptionEditor />
        <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
        <AwardsSelect awardOptions={initialOptions.options.awards} />
        <Form.Checkbox name="draft" label="Draft" type="checkbox" />
      </Panel>
      <FilmValuesWatcher
        selectedDraft={selectedDraft}
        onDraftCreated={setSelectedDraft}
        formDefaultValues={values}
      />
    </Form>
  );
};
