import {
  Button,
  ConfirmModal,
  FormSection,
  FormTextInput,
  FormToggle,
  type AwardMutationPayload,
} from '~/common';
import { nominationDefaultValues } from '~/routes/console/general_/awards_/-configs';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const NominationsForm = () => {
  const [nominationIndex, setNominationIndex] = useState<number | null>(null);

  const { control } = useFormContext<AwardMutationPayload>();

  const { fields, append, remove } = useFieldArray({
    name: 'nominations',
    control,
  });

  return (
    <FormSection label="Nominations">
      <div className="flex flex-col gap-5">
        {fields.map((_, index) => (
          <div
            className="flex gap-2.5 md:gap-5 flex-col md:flex-row items-start md:items-center"
            key={index}
          >
            <div className="w-full">
              <FormTextInput name={`nominations.${index}.title`} label="Nomination title" />
            </div>
            <div className="md:mt-5 flex gap-5">
              <FormToggle
                title="Should include actor"
                name={`nominations.${index}.shouldIncludeActor`}
              />
              <Button
                variant="ghost"
                icon={<Trash2Icon />}
                onClick={() => setNominationIndex(index)}
              />
            </div>
          </div>
        ))}
        <div>
          <Button
            variant="ghost"
            icon={<PlusIcon />}
            onClick={() => append(nominationDefaultValues)}
          >
            Add nomination
          </Button>
        </div>
        <ConfirmModal
          title={`Delete ${fields[nominationIndex ?? 0]?.title}?`}
          data={nominationIndex}
          onClose={() => setNominationIndex(null)}
          onConfirm={(index) => {
            remove(index);
            setNominationIndex(null);
          }}
        />
      </div>
    </FormSection>
  );
};
