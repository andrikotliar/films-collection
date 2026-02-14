import styles from './nomination-select.module.css';
import { useWatch } from 'react-hook-form';
import {
  api,
  FieldError,
  Form,
  getNominationsByAwardQueryOptions,
  Loader,
  queryKeys,
} from '~/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import type z from 'zod';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';
import { autoDetectShouldIncludeActor } from '~/routes/console/films_/-components/film-form/components/awards-select/helpers';

type NominationSelectProps = {
  index: number;
};

export const NominationSelect = ({ index }: NominationSelectProps) => {
  const awards = useWatch<z.infer<typeof FilmFormSchema>, 'awards'>({
    name: 'awards',
  });

  const currentAward = awards[index];

  const { data, isLoading } = useQuery(getNominationsByAwardQueryOptions(currentAward.awardId));

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
      invalidateQueries: [queryKeys.people.list()],
    },
  });

  const { mutateAsync: createNomination, isPending: isNominationCreating } = useMutation({
    mutationFn: async (value: string) => {
      const createdNomination = await api.awards.nominations.create({
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
      invalidateQueries: [
        queryKeys.awards.nominations.get({ params: { id: currentAward.awardId } }),
      ],
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

  const selectedNomination = data.find(
    (nomination) => nomination.value === Number(currentAward.nominationId),
  );

  const shouldShowActorSelect = selectedNomination?.shouldIncludeActor ?? false;

  return (
    <div className={styles.wrapper}>
      <Form.Select
        name={`awards.${index}.nominationId`}
        options={data}
        label="Nomination"
        onCreateOption={createNomination}
        isOptionsLoading={isNominationCreating}
      />
      {shouldShowActorSelect && (
        <Form.AsyncSelect
          name={`awards.${index}.personId`}
          optionsLoader={api.people.search.list}
          label="Person"
          queryKey={index}
          onCreateOption={createPerson}
          isOptionsLoading={isPending}
        />
      )}
    </div>
  );
};
