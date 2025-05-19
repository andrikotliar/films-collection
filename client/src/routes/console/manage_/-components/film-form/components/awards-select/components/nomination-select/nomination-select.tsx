import styles from './nomination-select.module.css';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchNominationsByAwardQuery, searchPersonQuery } from '@/queries';
import { FormAward, FormValues } from '@/routes/console/manage_/-types';
import {
  FieldError,
  FormSelect,
  Loader,
  Search,
  SearchResultPeopleList,
} from '@/components';

type NominationSelectProps = {
  index: number;
  onActorSelect: (index: number, value: FormAward) => void;
};

export const NominationSelect: FC<NominationSelectProps> = ({
  index,
  onActorSelect,
}) => {
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
        <div>
          <Search
            placeholder="Select actor..."
            query={searchPersonQuery}
            label="Nominee"
          >
            {({ data, onFinishInteraction }) => (
              <SearchResultPeopleList
                data={data ?? []}
                onAdd={(person) => {
                  onActorSelect(index, {
                    ...currentAward,
                    person,
                  });
                  onFinishInteraction();
                }}
              />
            )}
          </Search>
          {currentAward.person && (
            <div className={styles.selectedNominee}>
              <b>Selected nominee:</b> {currentAward.person.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
