import { FC } from 'react';
import {
  CreatePersonForm,
  CreatePersonFormProps,
} from '../CreatePersonForm/CreatePersonForm';
import { EditModal } from '../EditModal/EditModal';
import { Island } from '@/ui';

type CreatePersonModalProps = CreatePersonFormProps & {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const CreatePersonModal: FC<CreatePersonModalProps> = ({
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <EditModal isOpen={isOpen} onClose={onClose}>
      <Island>
        <CreatePersonForm {...props} />
      </Island>
    </EditModal>
  );
};
