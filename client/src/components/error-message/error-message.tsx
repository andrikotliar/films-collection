import { HttpError } from '@/services';
import styles from './error-message.module.css';
import { XIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

type ErrorMessageProps = {
  error: HttpError | null;
};

const ERROR_TIMEOUT_MS = 10_000;

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  const [internalError, setInternalError] =
    useState<ErrorMessageProps['error']>(null);

  useEffect(() => {
    let timeout: number;

    if (error) {
      setInternalError(error);

      timeout = setTimeout(() => {
        setInternalError(null);
      }, ERROR_TIMEOUT_MS);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  if (!internalError) {
    return null;
  }

  const handleCloseError = () => {
    setInternalError(null);
  };

  return (
    <div className={styles.errorMessage}>
      <div>{internalError.response.message}</div>
      <button className={styles.closeErrorButton} onClick={handleCloseError}>
        <XIcon size={16} />
      </button>
    </div>
  );
};
