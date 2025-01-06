import { Button, TextInput } from '@/ui';
import { FC, useState } from 'react';
import styles from './ConfirmationModalContent.module.css';

type ConfirmationModalContentProps = {
  title: string;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
};

export const ConfirmationModalContent: FC<ConfirmationModalContentProps> = ({
  title,
  onConfirm,
  onClose,
}) => {
  const [confirmationString, setConfirmationString] = useState('');

  const isConfirmationAvailable = confirmationString === title;

  return (
    <div>
      <TextInput
        label={`Type "${title}" to confirm delete operation`}
        value={confirmationString}
        onChange={(event) => setConfirmationString(event.target.value)}
      />
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          isDisabled={!isConfirmationAvailable}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
