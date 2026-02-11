import { HttpError } from '@films-collection/fetch-wrapper';
import { onlineManager } from '@tanstack/react-query';
import { Status } from '~/shared/components/error-screen/components';

type ErrorScreenProps = {
  error: unknown;
};

export const ErrorScreen = ({ error }: ErrorScreenProps) => {
  if (!onlineManager.isOnline()) {
    return (
      <Status
        title="No internet connection"
        message="Fix a connection issue and reload the page"
        imageSrc="/images/errors/no-internet.webp"
        isRecoverable
      />
    );
  }

  if (error instanceof HttpError) {
    if (error.status === 404) {
      return (
        <Status
          title="Not found"
          message="The page with given URL doesn't exist or is under construction"
          imageSrc="/images/errors/not-found-error.webp"
        />
      );
    }
    return (
      <Status
        title="Internal Server Error"
        message="Server returned incorrect response. Reload the page"
        imageSrc="/images/errors/server-error.webp"
        isRecoverable
      />
    );
  }

  if (error instanceof Error) {
    <Status
      title="App crashed"
      message={error.message}
      imageSrc="/images/errors/app-error.webp"
      isRecoverable
    />;
  }

  return (
    <Status
      title="Unknown error"
      message="The app currently is not working"
      imageSrc="/images/errors/unknown-error.webp"
      isRecoverable
    />
  );
};
