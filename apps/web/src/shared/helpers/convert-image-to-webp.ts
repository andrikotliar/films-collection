type Options = {
  targetHeight?: number;
  quality?: number;
};

export const convertImageToWebp = async (
  file: File,
  { targetHeight = 800, quality = 0.8 }: Options = {},
) => {
  const img = new Image();
  const url = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = url;
  });

  const scale = targetHeight / img.height;
  const targetWidth = Math.round(img.width * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality);
  });

  if (!blob) {
    throw new Error('Could not convert image to WebP');
  }

  URL.revokeObjectURL(url);

  return new File([blob], file.name.replace(/\.(jpe?g|png)$/i, '.webp'), {
    type: 'image/webp',
    lastModified: Date.now(),
  });
};
