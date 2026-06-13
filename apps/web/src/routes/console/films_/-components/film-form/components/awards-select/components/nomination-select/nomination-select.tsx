import styles from './nomination-select.module.css';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import {
  api,
  Button,
  FieldError,
  Form,
  getNominationsByAwardQueryOptions,
  Loader,
  queryKey,
} from '~/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { autoDetectShouldIncludeActor } from '~/routes/console/films_/-components/film-form/components/awards-select/helpers';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo } from 'react';

type NominationSelectProps = {
  index: number;
};

export const NominationSelect = ({ index }: NominationSelectProps) => {
  const awards = useWatch<z.infer<typeof FilmFormSchema>, 'awards'>({
    name: 'awards',
  });

  const { control } = useFormContext<z.infer<typeof FilmFormSchema>>();

  const { append, fields, remove } = useFieldArray({
    control,
    name: `awards.${index}.nominations`,
  });

  const currentAward = awards[index];

  const { data, isLoading } = useQuery(getNominationsByAwardQueryOptions(currentAward.awardId));

  const includeActorsMap = useMemo(() => {
    const map: Record<number, boolean> = {};

    if (!data) {
      return map;
    }

    for (const nomination of data) {
      map[nomination.value] = nomination.shouldIncludeActor;
    }

    return map;
  }, [data]);

  const { mutateAsync: createPerson, isPending } = useMutation({
    mutationFn: async (value: string) => {
      const createdPerson = await api.people.create({
        input: { name: value },
      });

      return {
        value: createdPerson.id,
        label: createdPerson.name,
      };
    },
    meta: {
      invalidateQueries: {
        queryKey: queryKey('people.getList'),
      },
    },
  });

  const { mutateAsync: createNomination, isPending: isNominationCreating } = useMutation({
    mutationFn: async (value: string) => {
      const createdNomination = await api.awards.createNomination({
        input: {
          id: -1,
          title: value,
          shouldIncludeActor: autoDetectShouldIncludeActor(value),
        },
        params: {
          id: currentAward.awardId,
        },
      });

      return {
        value: createdNomination.id,
        label: createdNomination.title,
      };
    },
    meta: {
      invalidateQueries: {
        queryKey: [queryKey('awards.getNominations'), currentAward.awardId],
      },
    },
  });

  if (!currentAward.awardId) {
    return null;
  }

  if (isLoading) {
    return <Loader size={25} />;
  }

  if (!data?.length) {
    return <FieldError error="Selected award does not have nominations" />;
  }

  return (
    <div className={styles.wrapper}>
      {fields.map((nomination, nominationIndex) => (
        <div key={nomination.id} className={styles.nomination_row}>
          <div className={styles.selects}>
            <Form.Select
              options={data}
              label="Nomination"
              name={`awards.${index}.nominations.${nominationIndex}.nominationId`}
              onCreateOption={createNomination}
              isOptionsLoading={isNominationCreating}
            />
            {includeActorsMap[currentAward.nominations[nominationIndex]?.nominationId] && (
              <Form.AsyncSelect
                name={`awards.${index}.nominations.${nominationIndex}.actorId`}
                optionsLoader={api.people.search}
                label="Person"
                queryKey={index}
                onCreateOption={createPerson}
                isOptionsLoading={isPending}
              />
            )}
          </div>
          <Button icon={<TrashIcon />} variant="ghost" onClick={() => remove(nominationIndex)} />
        </div>
      ))}
      <div>
        <Button
          variant="ghost"
          onClick={() => append({ nominationId: 0, actorId: null })}
          icon={<PlusIcon />}
        >
          Add nomination
        </Button>
      </div>
      ß
    </div>
  );
};
