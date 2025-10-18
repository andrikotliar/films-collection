import type { FilmDetails } from '~/common';
import { filmTabsConfig } from '~/routes/films/-configs/film-tabs';
import { Link, useRouterState } from '@tanstack/react-router';
import classNames from 'classnames';

type TabsProps = {
  film: FilmDetails;
};

const NUMBERS_SEQUENCE_REGEX = /\d+/;

export const Tabs = ({ film }: TabsProps) => {
  const location = useRouterState({ select: (s) => s.location });
  const config = filmTabsConfig.filter((item) => {
    if (Array.isArray(film[item.condition])) {
      return (film[item.condition] as Array<any>).length;
    }

    return film[item.condition];
  });

  return (
    <div className="flex gap-5 py-5 overflow-auto">
      {config.map((item) => (
        <Link
          to={item.route}
          key={item.route}
          className={classNames('pb-1 hover:text-sky-700 hover:border-b-sky-700', {
            'text-sky-700 border-b-2 border-b-sky-700 pointer-events-none font-medium':
              location.pathname.replace(NUMBERS_SEQUENCE_REGEX, '$id') === item.route,
          })}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};
