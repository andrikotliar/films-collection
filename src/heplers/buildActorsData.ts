import { Actor, Cast, FilledActorData } from "@/types";

export const buildActorsData = (
  actorsList: Actor[],
  cast: Cast[]
) => {
  const castData = cast.reduce((actors, currentActor) => {
    const foundActorData = actorsList.find(actor => actor.id === currentActor.actorId);
    if(foundActorData) {
      return [
        ...actors,
        {
          ...currentActor,
          name: foundActorData.name,
          photoUrl: foundActorData.photoUrl,
        }
      ]
    }

    console.error('Not found actor:', currentActor.actorId);
    return actors;
  }, [] as FilledActorData[]);

  return castData
};