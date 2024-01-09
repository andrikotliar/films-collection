import { randomUUID } from 'crypto';
import { prepareFileName } from './prepare-file-name.js';

const createFileName = (actorId, actorName) => {
  const formattedName = prepareFileName(actorName.toLowerCase());
  const result = `${formattedName}_${actorId}.webp`;

  return result;
};

const createNewActorData = (actorName, characterName) => {
  const id = randomUUID();
  const photoUrl = createFileName(id, actorName);

  const newActor = {
    id,
    name: actorName,
    photoUrl,
  };

  const castData = {
    actorId: id,
    name: actorName,
    character: {
      name: characterName,
      imageUrl: null,
    },
  };

  return {
    newActor,
    castData,
  };
};

export { createNewActorData };
