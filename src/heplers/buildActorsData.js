export const buildActorsData = (actorsList, cast) => {
  const castData = cast.map(c => {
    const foundActorData = actorsList.find(actor => actor.id === c.actorId);
    if(foundActorData) {
      return {
        ...c,
        name: foundActorData.name,
        photoUrl: foundActorData.photoUrl,
      }
    }

    console.error('Not found actor:', c.actorId);
    return;
  });

  return castData;
};