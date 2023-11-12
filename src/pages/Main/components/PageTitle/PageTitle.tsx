import classes from './PageTitle.module.css';
import { useFilmsContext } from '@/context';
import { DynamicObject } from '@/common';

const PageTitle = () => {
  const { filterParams } = useFilmsContext();

  if (!filterParams.actor && !filterParams.crew) {
    return null;
  }

  const currentDisplayValue = (filterParams: DynamicObject) => {
    if (filterParams.actor) {
      const actor = JSON.parse(filterParams.actor);

      return (
        <>
          <span>Starred:</span>{' '}
          <span className={classes.accent}>{actor.name}</span>
        </>
      );
    }

    if (filterParams.crew) {
      const crew = JSON.parse(filterParams.crew);

      return (
        <>
          <span>{crew.role}</span>{' '}
          <span className={classes.accent}>{crew.name}</span>
        </>
      );
    }

    return null;
  };

  const value = currentDisplayValue(filterParams);

  return <h2 className={classes.pageTitle}>{value}</h2>;
};

export { PageTitle };
