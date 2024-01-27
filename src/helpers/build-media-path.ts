import { filePaths } from '@/configs';

type PathParameters = keyof typeof filePaths;

const buildMediaPath = (parameter: PathParameters, slug: string) => {
  const fullPath = `${filePaths[parameter]}${slug}`;
  return fullPath;
};

export { buildMediaPath };
