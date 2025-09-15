import type { ReactNode } from 'react';

type FilmPageLayoutProps = {
  children?: ReactNode;
};

export const FilmPageLayout = ({ children }: FilmPageLayoutProps) => {
  return <div className="flex flex-col py-5 mx-auto max-w-7xl">{children}</div>;
};
