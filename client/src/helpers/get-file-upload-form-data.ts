import { FileUploadPayload } from '@/types';

export const getFileUploadFormData = ({
  title,
  file,
  destination,
}: FileUploadPayload) => {
  const formData = new FormData();

  formData.append('title', title);
  formData.append('destination', destination);
  formData.append('file', file);

  return formData;
};
