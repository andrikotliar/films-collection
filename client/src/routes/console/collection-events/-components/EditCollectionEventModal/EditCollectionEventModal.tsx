import { EditModal } from '@/routes/console/-components';
import { EditCollectionEventForm } from '../EditCollectionEventForm/EditCollectionEventForm';
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
    <EditModal isOpen={defaultValues !== null} onClose={onClose}>
      {defaultValues && (
        <EditCollectionEventForm
          defaultValues={defaultValues}
          onSubmitSuccess={() => {
            refetchList();
            onClose();
          }}
        />
      )}
    </EditModal>
  );
};
