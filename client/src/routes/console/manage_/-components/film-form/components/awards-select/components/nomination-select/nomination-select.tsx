import styles from './nomination-select.module.css';
import { useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchNominationsByAwardQuery } from '@/common';
import { FormValues } from '@/routes/console/manage_/-types';
import { FieldError, FormAsyncSelect, FormSelect, Loader } from '@/components';
import { PeopleApi } from '@/api';

type NominationSelectProps = {
  index: number;
};

export const NominationSelect = ({ index }: NominationSelectProps) => {
  const awards = useWatch<FormValues, 'awards'>({
    name: 'awards',
  });

  const currentAward = awards[index];

  const { data, isLoading } = useQuery(
    fetchNominationsByAwardQuery(currentAward.awardId),
  );

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
      <FormSelect
        name={`awards.${index}.nominationId`}
        options={data}
        label="Nomination"
      />
      {shouldShowActorSelect && (
        <FormAsyncSelect
          name={`awards.${index}.personId`}
          optionsLoader={PeopleApi.searchByName}
          label="Person"
        />
      )}
    </div>
  );
};
