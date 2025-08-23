import type { ReactNode } from 'react';

type EventsListProps = {
  children: ReactNode;
};

export const EventsList = ({ children }: EventsListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-5">{children}</div>
  );
};
