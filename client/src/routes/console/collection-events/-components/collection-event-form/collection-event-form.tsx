import styles from './styles.module.css';
import {
  Button,
  FormTextInput,
  FormTitle,
  FormSelect,
  Panel,
  FormCheckbox,
  FormMonthDateSelector,
  FieldLabel,
  FormAsyncSelect,
} from '@/components';
import { SaveIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialDataQuery, isNewItem, type FormComponentProps } from '@/common';
import { FormProvider, useForm } from 'react-hook-form';
import { FilmsApi } from '@/api';
import { useMutateCollectionEvent, type CollectionEventMutationPayload } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectionEventSchema } from '@/routes/console/collection-events/-validation';

type CollectionEventFormProps = FormComponentProps<CollectionEventMutationPayload>;

export const CollectionEventForm = ({ values, onParentModalClose }: CollectionEventFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());
  const form = useForm({
    defaultValues: values,
    resolver: yupResolver(collectionEventSchema),
  });

  const isOneDayEvent = form.watch('isOneDayEvent');

  const { mutateAsync, isPending } = useMutateCollectionEvent();

  const title = isNewItem(values.id) ? 'Create collection event' : `Edit ${values.title}`;

  const submit = async (data: CollectionEventMutationPayload) => {
    await mutateAsync(data);
    onParentModalClose();
  };

  return (
    <FormProvider {...form}>
      <Panel>
        <form onSubmit={form.handleSubmit(submit)} className={styles.formWrapper}>
          <FormTitle>{title}</FormTitle>
          <FormTextInput name="title" label="Title" />
          {data && (
            <FormSelect label="Collection" options={data.options.collections} name="collectionId" />
          )}
          <div className={styles.dates}>
            <div className={styles.inputWrapper}>
              <div className={styles.datesHeader}>
                <FieldLabel>Start Date</FieldLabel>
                <FormCheckbox name="isOneDayEvent" type="checkbox" label="One day event" />
              </div>
              <FormMonthDateSelector name="startDate" initialYear={2000} />
            </div>
            {!isOneDayEvent && (
              <div className={styles.inputWrapper}>
                <div className={styles.datesHeader}>
                  <FieldLabel>End Date</FieldLabel>
                </div>
                <FormMonthDateSelector name="endDate" initialYear={2000} />
              </div>
            )}
          </div>
          <FormAsyncSelect
            name="titleFilmId"
            optionsLoader={FilmsApi.getOptions}
            label="Title film"
          />
          <FormTextInput
            name="yearFrom"
            label="First event occurrence year"
            placeholder="E.g. 2020"
          />
          <Button type="submit" isLoading={isPending} icon={<SaveIcon />}>
            Save
          </Button>
        </form>
      </Panel>
    </FormProvider>
  );
};
