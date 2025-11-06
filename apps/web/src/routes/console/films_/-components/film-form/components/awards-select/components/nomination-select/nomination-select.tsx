import styles from './styles.module.css';
import { useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchNominationsByAwardQuery, FieldError, Form, Loader } from '~/lib';
import { type FilmFormValues } from '~/routes/console/films_/-types';
import { PeopleApi } from '~/api';

type Props = {
  index: number;
};

export const NominationSelect = ({ index }: Props) => {
  const awards = useWatch<FilmFormValues, 'awards'>({
    name: 'awards',
  });

  const currentAward = awards[index];

  const { data, isLoading } = useQuery(fetchNominationsByAwardQuery(currentAward.awardId));

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
      <Form.Select name={`awards.${index}.nominationId`} options={data} label="Nomination" />
      {shouldShowActorSelect && (
        <Form.AsyncSelect
          name={`awards.${index}.personId`}
          optionsLoader={PeopleApi.searchByName}
          label="Person"
        />
      )}
    </div>
  );
};
