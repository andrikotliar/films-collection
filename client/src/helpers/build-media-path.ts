export const buildMediaPath = (slug: string) => {
  const fullPath = `${import.meta.env.VITE_BASE_MEDIA_URL}/${slug}`;
  return fullPath;
};
