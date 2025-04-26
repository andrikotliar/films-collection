import { FileUploadPayload } from '@/types';

export const getFileUploadFormData = ({
  title,
  file,
  destination,
  shouldUseUniqueIdentifier,
}: FileUploadPayload) => {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('destination', destination);
  formData.append('file', file);

  if (shouldUseUniqueIdentifier) {
    formData.append(
      'shouldUseUniqueIdentifier',
      shouldUseUniqueIdentifier.toString(),
    );
  }

  return formData;
};
