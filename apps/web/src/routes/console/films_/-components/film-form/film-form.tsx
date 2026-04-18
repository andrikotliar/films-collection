import type z from 'zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { api, Form, getInitialDataQueryOptions, isNewItem, Panel } from '~/shared';
import { DescriptionEditor, FilmFormSchema, useManageFilm } from '~/routes/console/-shared';
import {
  AwardsSelect,
  CastAndCrewSelect,
  ChaptersSelect,
  Drafts,
  FilmValuesWatcher,
  MoneyInput,
  SeriesExtension,
  TrailersSelect,
} from '~/routes/console/films_/-components/film-form/components';
import { useState } from 'react';
import type { FilmDraftResponse } from '@films-collection/shared';
import { useNavigate } from '@tanstack/react-router';

type FilmFormProps = {
  values: z.infer<typeof FilmFormSchema>;
};

type CreateNewEntityInput = {
  value: string;
  type: 'genres' | 'countries' | 'studios' | 'collections';
};

export const FilmForm = ({ values }: FilmFormProps) => {
  const { data: initialOptions } = useSuspenseQuery(getInitialDataQueryOptions());
  const [selectedDraft, setSelectedDraft] = useState<FilmDraftResponse | null>(null);
  const navigate = useNavigate();

  const { mutateAsync: handleSubmit, isPending } = useManageFilm({
    values,
    tempDraftId: selectedDraft?.id,
    onSuccess: () => {
      navigate({ to: '/console/films' });
    },
    invalidateQueries: [
      {
        queryKey: [api.films.getAdminList.staticKey],
      },
      {
        queryKey: [api.films.getCount.staticKey],
      },
      ...(!isNewItem(values.id)
        ? [
            {
              queryKey: [api.films.getById.staticKey, values.id],
            },
          ]
        : []),
    ],
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
        <Form.Select
          label="Collections"
          name="collections"
          options={initialOptions.options.collections}
          onCreateOption={(value) => createNewEntity({ value, type: 'collections' })}
          isMulti
        />
        <Form.TextInput name="duration" type="number" label="Runtime (min)" min="0" />
        <Form.DatePicker name="releaseDate" label="Release Date" />
        <MoneyInput name="budget" label="Budget" />
        <MoneyInput name="boxOffice" label="Box Office" />
        <DescriptionEditor />
        <CastAndCrewSelect positionOptions={initialOptions.options.roles} />
        <AwardsSelect awardOptions={initialOptions.options.awards} />

        <ChaptersSelect />
      </Panel>
      <FilmValuesWatcher
        selectedDraft={selectedDraft}
        onDraftCreated={setSelectedDraft}
        formDefaultValues={values}
      />
    </Form>
  );
};
