const imagesUrl = import.meta.env.VITE_IMAGES_URL;

export const getExternalImageUrl = (key?: string | null) => {
  if (!imagesUrl || !key) {
    return null;
  }

  const normalizedImagesUrl = imagesUrl.endsWith('/') ? imagesUrl : imagesUrl + '/';
  const normalizedKey = key.startsWith('/') ? key.slice(1) : key;

  return `${normalizedImagesUrl}${normalizedKey}`;
};
