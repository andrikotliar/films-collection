import { FocusEventHandler, useEffect, useRef, useState } from 'react';

type Options = {
  externalWatchedValue?: string;
  validation?: {
    regex: RegExp;
    errorMessage: string;
  };
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const useUrlInput = ({
  externalWatchedValue,
  validation,
  onBlur,
}: Options) => {
  const previewImageRef = useRef<HTMLImageElement>(null);
  const [previewPath, setPreviewPath] = useState(externalWatchedValue ?? '');
  const [internalError, setInternalError] = useState<string | null>(null);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);

    const value = event.target.value;

    if (validation) {
      const isPathValid = value.length ? validation.regex.test(value) : true;

      if (!isPathValid) {
        setInternalError(validation?.errorMessage);
        return;
      }
    }

    if (internalError) {
      setInternalError(null);
    }

    setPreviewPath(value);
  };

  useEffect(() => {
    if (typeof externalWatchedValue !== 'string' && previewPath.length) {
      setPreviewPath('');
    }
  }, [externalWatchedValue, previewPath]);

  return {
    previewImageRef,
    handleBlur,
    previewPath,
    internalError,
  };
};
