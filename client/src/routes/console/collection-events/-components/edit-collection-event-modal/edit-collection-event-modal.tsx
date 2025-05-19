import { FormModal } from '@/routes/console/-components';
import { EditCollectionEventForm } from '../edit-collection-event-form/edit-collection-event-form';
import { CollectionEventFilled } from '@/types';
import { FC } from 'react';

type EditCollectionEventModalProps = {
  defaultValues: CollectionEventFilled | null;
  onClose: VoidFunction;
  refetchList: VoidFunction;
};

export const EditCollectionEventModal: FC<EditCollectionEventModalProps> = ({
  defaultValues,
  onClose,
  refetchList,
}) => {
  return (
    <FormModal isOpen={defaultValues !== null} onClose={onClose}>
      {defaultValues && (
        <EditCollectionEventForm
          defaultValues={defaultValues}
          onSubmitSuccess={() => {
            refetchList();
            onClose();
          }}
        />
      )}
    </FormModal>
  );
};
