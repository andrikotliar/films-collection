import { environment } from '@/configs';

type PathParameters = keyof typeof environment;

const buildMediaPath = (parameter: PathParameters, slug: string) => {
  const fullPath = `${environment[parameter]}${slug}`;
  return fullPath;
};

export { buildMediaPath };
