type HandleImageError = (imageSource: string) => React.ReactEventHandler<HTMLImageElement>;

export const handleImageError: HandleImageError = (imageSource) => {
  return (event) => {
    event.currentTarget.src = imageSource;
  };
};
