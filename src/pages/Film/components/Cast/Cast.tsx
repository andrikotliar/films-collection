import classes from './Cast.module.css';
import { FC, useEffect, useState } from 'react';
import { useActorsContext } from '@/context/ActorsContext';
import { buildActorsData } from '@/helpers';
import {
  Cast as CastType,
  FilledActorData,
} from '@/common';
import { Actor } from '@/pages/Film/components/Cast/components';
import { Loader } from '@/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  const { actors } = useActorsContext();

  const [fullCastData, setFullCastData] = useState<
    FilledActorData[]
  >([]);

  useEffect(() => {
    if (actors.length) {
      const fullData = buildActorsData(actors, cast);
      setFullCastData(fullData);
    }
  }, [cast, actors]);

  if (!fullCastData.length) {
    return <Loader />;
  }

  return (
    <div className={classes.cast}>
      {fullCastData.map(actor => (
        <Actor actor={actor} key={actor.actorId} />
      ))}
    </div>
  );
};

export { Cast };
